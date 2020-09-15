import React, { useState, useEffect, Component } from 'react';
import crypto from 'crypto';
import PropTypes from 'prop-types';
import { format, startOfWeek, endOfWeek, differenceInHours, isSameDay, getDay, isSameWeek, differenceInCalendarDays, subDays, addDays, parse, subHours, addHours, isSameHour, startOfDay, endOfDay, isAfter, isSameMonth, isToday, setHours, isBefore, subMinutes, differenceInMinutes, subMonths, addMonths, subWeeks, addWeeks, startOfMonth, endOfMonth, isWithinRange } from 'date-fns';
import { MDBBtnGroup, MDBBtn, MDBLink, MDBModal, MDBModalHeader, MDBModalBody, MDBInput, MDBModalFooter } from 'mdbreact';
import classNames from 'classnames';
import { DraggableCore } from 'react-draggable';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.



var rng = function nodeRNG() {
  return crypto.randomBytes(16);
};

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

var bytesToUuid_1 = bytesToUuid;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid_1(b);
}

var v1_1 = v1;

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };

  function localize (token, count, options) {
    options = options || {};

    var result;
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token];
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one;
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count);
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

var build_distance_in_words_locale = buildDistanceInWordsLocale;

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
];

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = [];
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key);
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse();
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  );

  return formattingTokensRegExp
}

var build_formatting_tokens_reg_exp = buildFormattingTokensRegExp;

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var meridiemUppercase = ['AM', 'PM'];
  var meridiemLowercase = ['am', 'pm'];
  var meridiemFull = ['a.m.', 'p.m.'];

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  };

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W'];
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    };
  });

  return {
    formatters: formatters,
    formattingTokensRegExp: build_formatting_tokens_reg_exp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

var build_format_locale = buildFormatLocale;

/**
 * @category Locales
 * @summary English locale.
 */
var en = {
  distanceInWords: build_distance_in_words_locale(),
  format: build_format_locale()
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".full-calendar-plugin {\r\n  width: 100%;\r\n}\r\n\r\n.full-calendar-plugin .calendar-controls {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.full-calendar-plugin .grid-row {\r\n  display: grid;\r\n  grid-template-columns: repeat(8, 1fr);\r\n  border-bottom: solid 1px #dddddd;\r\n  grid-gap: 1px;\r\n}\r\n\r\n.full-calendar-plugin .grid-row:first-child {\r\n  border-top: solid 1px #dddddd;\r\n}\r\n\r\n.full-calendar-plugin .month-grid .grid-row {\r\n  grid-template-columns: repeat(7, 1fr);\r\n}\r\n\r\n.full-calendar-plugin .month-grid .grid-row:not(:first-child) {\r\n  height: 12vh;\r\n}\r\n\r\n.full-calendar-plugin .week-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(8, 1fr);\r\n  grid-template-rows: repeat(24, 1fr);\r\n  grid-gap: 1px;\r\n}\r\n\r\n.full-calendar-plugin .list-grid {\r\n  list-style: none;\r\n  border: solid 1px #dddddd;\r\n  padding: 0;\r\n}\r\n\r\n.full-calendar-plugin .table-cell {\r\n  position: relative;\r\n  cursor: pointer;\r\n  outline: none;\r\n  font-size: .9rem;\r\n  font-weight: 300;\r\n  background: #ffffff;\r\n  color: #000000;\r\n  border-right: solid 1px #dddddd;\r\n  z-index: 1;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list {\r\n  border: none;\r\n  border-bottom: solid 1px #dddddd;\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  padding: 8px 10px;\r\n  min-height: calc(.9rem + 16px);\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list .task-color {\r\n  background-color: #33b5e5;\r\n  min-width: 16px;\r\n  min-height: 16px;\r\n  border-radius: 50%;\r\n  margin-right: 10px;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list.table-cell__head {\r\n  background-color: #f8f8f8;\r\n  font-weight: 700;\r\n  justify-content: space-between;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list:last-child {\r\n  border: none;\r\n}\r\n\r\n.full-calendar-plugin .week-grid .table-cell {\r\n  border-bottom: solid 1px #dddddd;\r\n  height: 30px;\r\n}\r\n\r\n.full-calendar-plugin .week-grid .table-cell:nth-child(8n + 1) {\r\n  border-left: solid 1px #dddddd;\r\n}\r\n\r\n.full-calendar-plugin .table-cell:first-child {\r\n  border-left: solid 1px #dddddd;\r\n}\r\n\r\n.full-calendar-plugin .table-cell--today {\r\n  background-color: #e1f5fe;\r\n}\r\n\r\n.full-calendar-plugin .table-cell--not-curr-month {\r\n  color: #e0e0e0;\r\n}\r\n\r\n.full-calendar-plugin .table-cell--double {\r\n  min-height: 60px;\r\n  border-bottom-width: 4px;\r\n}\r\n\r\n.full-calendar-plugin .table-cell:not(.table-cell__head):hover,\r\n.full-calendar-plugin .table-cell:not(.table-cell__head):focus {\r\n  background-color: #f8f8f8;\r\n  outline: none;\r\n}\r\n\r\n.full-calendar-plugin .table-cell:not(.table-cell__head).active {\r\n  background-color: #f8f8f8;\r\n  outline: none;\r\n}\r\n\r\n\r\n.full-calendar-plugin .table-cell__head {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-weight: bold;\r\n  cursor: default;\r\n}\r\n\r\n.full-calendar-plugin .month-grid .table-cell:not(.table-cell__head) {\r\n  height: 100%;\r\n  position: relative;\r\n  padding: 8px 5px;\r\n  vertical-align: top;\r\n  text-align: right;\r\n}\r\n\r\n.full-calendar-plugin .week {\r\n  position: relative;\r\n}\r\n\r\n.full-calendar-plugin .week .week-presentation {\r\n  position: absolute;\r\n  top: 30px;\r\n  width: 100%;\r\n  height: calc(100% - 30px);\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  grid-template-rows: repeat(5, 1fr);\r\n  grid-auto-flow: column;\r\n  vertical-align: baseline;\r\n  /* grid-gap: 1px; */\r\n}\r\n\r\n.full-calendar-plugin .week.week-grid .week-presentation {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template-columns: repeat(35, 1fr);\r\n  grid-template-rows: repeat(24, 1fr);\r\n  grid-column-start: 2;\r\n  grid-gap: 1px;\r\n}\r\n\r\n.full-calendar-plugin .week .task-bar {\r\n  position: relative;\r\n  background-color: #33b5e5;\r\n  color: #ffffff;\r\n  font-size: 80%;\r\n  font-weight: bold;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  z-index: 100;\r\n}\r\n\r\n.full-calendar-plugin .week .week-presentation .task-bar {\r\n  grid-row: auto;\r\n  padding: 0 .25rem;\r\n  margin: 2px 4px;\r\n  height: 20px;\r\n  width: auto;\r\n}\r\n\r\n.full-calendar-plugin .week.week-grid .week-presentation .task-bar {\r\n  padding: .25rem 0;\r\n  margin: 4px 1px;\r\n  height: auto;\r\n  width: 20px;\r\n  writing-mode: vertical-rl;\r\n  text-orientation: mixed;\r\n}\r\n\r\n.full-calendar-plugin .week .week-presentation .task-bar:hover {\r\n  opacity: .8;\r\n}\r\n\r\n.full-calendar-plugin .week .week-presentation .task-bar .task-bar__title {\r\n  position: absolute;\r\n  display: block;\r\n  width: 95%;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.full-calendar-plugin .week .week-presentation .task-bar .task-bar--shadow {\r\n  position: absolute;\r\n  overflow: hidden;\r\n  bottom: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  /* background-color: #33b5e5; */\r\n  font-size: 100%;\r\n  padding: 0 .25rem;\r\n  z-index: 1000;\r\n}\r\n\r\n.full-calendar-plugin .week.week-grid .week-presentation .task-bar .task-bar--shadow {\r\n  padding: .25rem 0;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list .task-color.info,\r\n.full-calendar-plugin .week .week-presentation .task-bar.info,\r\n.full-calendar-plugin .week .week-presentation .task-bar.info .task-bar--shadow {\r\n  background-color: #33b5e5;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list .task-color.success,\r\n.full-calendar-plugin .week .week-presentation .task-bar.success,\r\n.full-calendar-plugin .week .week-presentation .task-bar.success .task-bar--shadow {\r\n  background-color: #00c851;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list .task-color.warning,\r\n.full-calendar-plugin .week .week-presentation .task-bar.warning,\r\n.full-calendar-plugin .week .week-presentation .task-bar.warning .task-bar--shadow {\r\n  background-color: #ffbb33;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list .task-color.danger,\r\n.full-calendar-plugin .week .week-presentation .task-bar.danger,\r\n.full-calendar-plugin .week .week-presentation .task-bar.danger .task-bar--shadow {\r\n  background-color: #ff3547;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list .task-color.primary,\r\n.full-calendar-plugin .week .week-presentation .task-bar.primary,\r\n.full-calendar-plugin .week .week-presentation .task-bar.primary .task-bar--shadow {\r\n  background-color: #4285f4;\r\n}\r\n\r\n.full-calendar-plugin .list-grid .table-cell--list .task-color.secondary,\r\n.full-calendar-plugin .week .week-presentation .task-bar.secondary,\r\n.full-calendar-plugin .week .week-presentation .task-bar.secondary .task-bar--shadow {\r\n  background-color: #aa66cc;\r\n}\r\n\r\n.full-calendar-plugin .modal .md-form:first-child {\r\n  margin-top: 10px;\r\n}\r\n\r\n.full-calendar-plugin .modal .md-form {\r\n  margin-top: 40px;\r\n}\r\n\r\n.full-calendar-plugin .modal .md-form input.form-control[type=\"datetime-local\"]~label {\r\n  transform: translateY(-140%);\r\n  font-size: .8rem;\r\n}\r\n\r\n@media screen and (max-width: 1200px) {\r\n  .full-calendar-plugin .calendar-controls {\r\n    flex-direction: column;\r\n  }\r\n}";
styleInject(css);

var CalendarHeader = function CalendarHeader(_ref) {
  var activeView = _ref.activeView,
      activeDate = _ref.activeDate,
      locale = _ref.locale;

  if (activeView === 'month') {
    return React.createElement("h2", {
      className: "m-0"
    }, format(activeDate, 'MMMM YYYY', {
      locale: locale
    }));
  }

  return React.createElement("h2", {
    className: "m-0"
  }, "".concat(format(startOfWeek(activeDate), 'MMM DD', {
    locale: locale
  }), " - ").concat(format(endOfWeek(activeDate), 'MMM DD, YYYY', {
    locale: locale
  })));
};

CalendarHeader.propTypes = {
  activeView: PropTypes.string.isRequired,
  activeDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.object.isRequired
};

var SwitchButtons = function SwitchButtons(_ref) {
  var active = _ref.active,
      leftEvt = _ref.leftEvt,
      middleEvt = _ref.middleEvt,
      rightEvt = _ref.rightEvt,
      texts = _ref.texts,
      btnSizes = _ref.btnSizes,
      btnSizesClassName = _ref.btnSizesClassName,
      btnSizesColors = _ref.btnSizesColors;
  return React.createElement(MDBBtnGroup, {
    size: btnSizes,
    className: btnSizesClassName
  }, React.createElement(MDBBtn, {
    color: btnSizesColors[0],
    outline: !(active === 0),
    onClick: leftEvt
  }, texts[0]), React.createElement(MDBBtn, {
    color: btnSizesColors[1],
    outline: !(active === 1),
    onClick: middleEvt
  }, texts[1]), React.createElement(MDBBtn, {
    color: btnSizesColors[2],
    outline: !(active === 2),
    onClick: rightEvt
  }, texts[2]));
};

SwitchButtons.propTypes = {
  leftEvt: PropTypes.func.isRequired,
  middleEvt: PropTypes.func.isRequired,
  rightEvt: PropTypes.func.isRequired,
  texts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  active: PropTypes.number
};

var BaseTableCell = function BaseTableCell(_ref) {
  var children = _ref.children,
      day = _ref.day,
      double = _ref.double,
      event = _ref.event,
      head = _ref.head,
      notCurrMonth = _ref.notCurrMonth,
      today = _ref.today,
      list = _ref.list;

  function runEvent() {
    if (head) return;
    event({}, day);
  }

  var classes = classNames("table-cell", list && "table-cell--list", head && "table-cell__head", today && "table-cell--today", notCurrMonth && "table-cell--not-curr-month", double && "table-cell--double");
  var Tag = list ? "li" : "div";
  return React.createElement(Tag, {
    tabIndex: !head ? 0 : -1,
    className: classes,
    "data-day": day,
    onClick: runEvent
  }, children);
};

BaseTableCell.propTypes = {
  children: PropTypes.node,
  day: PropTypes.instanceOf(Date),
  double: PropTypes.bool,
  event: PropTypes.func,
  head: PropTypes.bool,
  notCurrMonth: PropTypes.bool,
  today: PropTypes.bool,
  list: PropTypes.bool
};

var TaskBar = function TaskBar(_ref) {
  var _React$createElement;

  var event = _ref.event,
      _ref$task = _ref.task,
      id = _ref$task.id,
      title = _ref$task.title,
      startDate = _ref$task.startDate,
      endDate = _ref$task.endDate,
      color = _ref$task.color,
      dark = _ref$task.dark,
      link = _ref$task.link,
      to = _ref$task.to,
      active = _ref$task.active,
      onClickLink = _ref$task.onClickLink,
      updateTask = _ref.updateTask,
      weekDays = _ref.weekDays,
      weekGrid = _ref.weekGrid,
      disable = _ref.disable;

  if (differenceInHours(endDate, startDate) < 24 && weekGrid) {
    return null;
  }

  if (isSameDay(weekDays[0], endDate) && format(endDate, "HHmm") === "0000") {
    return null;
  }

  var _useState = useState("0"),
      _useState2 = _slicedToArray(_useState, 2),
      opacityShadow = _useState2[0],
      setOpacityShadow = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      shadowX = _useState4[0],
      setShadowX = _useState4[1];

  var _useState5 = useState({
    x: 0,
    y: 0
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      translateShadow = _useState6[0],
      setTranslateShadow = _useState6[1];

  var _useState7 = useState("100%"),
      _useState8 = _slicedToArray(_useState7, 2),
      widthShadow = _useState8[0],
      setWidthShadow = _useState8[1];

  var _useState9 = useState(getDay(startDate) + 1),
      _useState10 = _slicedToArray(_useState9, 2),
      colStart = _useState10[0],
      setColStart = _useState10[1];

  var _useState11 = useState(getDay(endDate) + (format(endDate, "HHmm") !== "0000" ? 2 : 1)),
      _useState12 = _slicedToArray(_useState11, 2),
      colEnd = _useState12[0],
      setColEnd = _useState12[1];

  useEffect(function () {
    if (!isSameWeek(startDate, endDate)) {
      if (!isSameWeek(startDate, weekDays[0])) {
        setColStart(1);
      } else {
        setColStart(getDay(startDate) + 1);
      }

      if (!isSameWeek(endDate, weekDays[0])) {
        setColEnd(8);
      } else {
        setColEnd(getDay(endDate) + (format(endDate, "HHmm") !== "0000" ? 2 : 1));
      }
    }
  }, [startDate, endDate, weekDays]);

  function handleDragStart(e, data) {
    setOpacityShadow(".8");
    setWidthShadow("140px");
    var rect = data.node.getBoundingClientRect();
    setShadowX(e.pageX - rect.left - 140 * Math.floor((e.pageX - rect.left) / 140));
  }

  function handleDrag(e, data) {
    var currentAreaDay = document.elementsFromPoint(e.clientX, e.clientY).find(function (element) {
      return element.dataset.day;
    });
    currentAreaDay && currentAreaDay.focus();
    setTranslateShadow({
      x: data.x - shadowX,
      y: data.y - 10 - data.deltaY
    });
  }

  function handleDragStop(e) {
    setOpacityShadow("0");
    setWidthShadow("100%");
    setShadowX(0);
    var dropAreaDay = document.elementsFromPoint(e.clientX, e.clientY).find(function (element) {
      return element.dataset.day;
    });
    var newStartDay = dropAreaDay ? dropAreaDay.dataset.day : startDate;
    var difference = differenceInCalendarDays(newStartDay, startDate);
    var newStartDate = difference < 0 ? subDays(startDate, -difference) : addDays(startDate, difference);
    var newEndDate = difference < 0 ? subDays(endDate, -difference) : addDays(endDate, difference);
    var newTask = {
      id: id,
      title: title,
      startDate: newStartDate,
      endDate: newEndDate,
      color: color,
      dark: dark
    };

    if (difference !== 0 && translateShadow.x !== 0) {
      updateTask(newTask);
    } else {
      setTranslateShadow({
        x: 0,
        y: 0
      });
    }
  }

  var style = {
    gridColumn: "".concat(colStart, " / ").concat(colEnd)
  };
  var shadowStyle = {
    width: widthShadow,
    opacity: opacityShadow,
    transform: "translate(".concat(translateShadow.x, "px, ").concat(translateShadow.y, "px)")
  };
  return React.createElement("div", {
    style: style,
    className: "task-bar ".concat(color, "-color").concat(dark ? "-dark" : ""),
    onClick: function onClick() {
      return event({
        id: id,
        title: title,
        startDate: startDate,
        endDate: endDate,
        color: color,
        dark: dark
      });
    }
  }, React.createElement("span", {
    className: "task-bar__title"
  }, title), !link ? React.createElement(DraggableCore, {
    onStart: handleDragStart,
    onDrag: handleDrag,
    onStop: handleDragStop,
    disabled: disable
  }, React.createElement("div", {
    style: shadowStyle,
    className: "task-bar--shadow ".concat(color, "-color").concat(dark ? "-dark" : ""),
    onClick: function onClick() {
      return console.log("lol");
    }
  }, React.createElement("span", {
    className: "task-bar__title"
  }, title))) : React.createElement("div", {
    style: shadowStyle,
    className: "task-bar--shadow ".concat(color, "-color").concat(dark ? "-dark" : "")
  }, React.createElement(MDBLink, (_React$createElement = {
    to: "#",
    link: true
  }, _defineProperty(_React$createElement, "to", to), _defineProperty(_React$createElement, "active", active), _defineProperty(_React$createElement, "onClick", onClickLink), _React$createElement), React.createElement("span", {
    className: "task-bar__title"
  }, title))));
};

TaskBar.propTypes = {
  event: PropTypes.func.isRequired,
  task: PropTypes.shape({
    color: PropTypes.string,
    endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    id: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    title: PropTypes.string
  }).isRequired,
  weekDays: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  weekGrid: PropTypes.bool,
  disable: PropTypes.bool
};

function findIndex(allTasks, id, dates) {
  var sameTasks = allTasks.filter(function (item) {
    return isSameDay(item.startDate, dates[0]) || isSameDay(item.endDate, dates[1]) || isSameDay(item.startDate, dates[1]);
  });
  return sameTasks.findIndex(function (item) {
    return item.id === id;
  });
}

var WeekTaskBar = function WeekTaskBar(_ref) {
  var allTasks = _ref.allTasks,
      event = _ref.event,
      _ref$task = _ref.task,
      id = _ref$task.id,
      startDate = _ref$task.startDate,
      endDate = _ref$task.endDate,
      title = _ref$task.title,
      color = _ref$task.color,
      dark = _ref$task.dark,
      link = _ref$task.link,
      to = _ref$task.to,
      active = _ref$task.active,
      onClickLink = _ref$task.onClickLink,
      index = _ref.index,
      updateTask = _ref.updateTask,
      weekStart = _ref.weekStart,
      disable = _ref.disable;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      bars = _useState2[0],
      setBars = _useState2[1];

  var _useState3 = useState([startDate, endDate]),
      _useState4 = _slicedToArray(_useState3, 2),
      dates = _useState4[0],
      setDates = _useState4[1];

  var colIndex = findIndex(allTasks, id, dates);
  colIndex = colIndex < 0 ? 0 : colIndex;
  var inHoursDifference = differenceInHours(dates[1], dates[0]);
  if (inHoursDifference > 24) return null;
  useEffect(function () {
    var areSameWeek = isSameWeek(dates[0], dates[1]);
    var isThisWeek = isSameWeek(dates[0], weekStart);
    var firstRowStart = isThisWeek ? parseInt(format(dates[0], "H")) + 1 : 1;
    var rowEnd = areSameWeek || !isThisWeek ? parseInt(format(dates[1], "H")) + 2 : 25;
    var firstColStart = isThisWeek ? differenceInCalendarDays(dates[0], weekStart) * 5 + 1 + colIndex : 1 + colIndex;
    var secondColStart = isThisWeek ? differenceInCalendarDays(dates[1], weekStart) * 5 + 1 + colIndex : 1 + colIndex;

    if (!isSameDay(dates[0], dates[1]) && areSameWeek) {
      setBars([{
        gridRowStart: firstRowStart,
        gridRowEnd: 25,
        gridColumnStart: firstColStart,
        gridColumnEnd: firstColStart + 1
      }, {
        gridRowStart: 1,
        gridRowEnd: rowEnd,
        gridColumnStart: secondColStart,
        gridColumnEnd: secondColStart + 1
      }]);
    } else {
      setBars([{
        gridRowStart: firstRowStart,
        gridRowEnd: rowEnd,
        gridColumnStart: firstColStart,
        gridColumnEnd: firstColStart + 1
      }]);
    }
  }, [dates, index, weekStart]);

  function handleDrag(e) {
    var currentDay = document.elementsFromPoint(e.clientX, e.clientY).find(function (element) {
      return element.dataset.day;
    });
    if (!currentDay) return;
    var newStartDate = parse(currentDay.dataset.day);
    var difference = differenceInHours(newStartDate, dates[0]);
    var newEndDate = difference < 0 ? subHours(dates[1], -difference) : addHours(dates[1], difference);

    if (!isSameHour(dates[0], newStartDate) || !isSameDay(dates[0], newStartDate)) {
      setDates([newStartDate, newEndDate]);
    }
  }

  function handleDragStop() {
    var newTask = {
      id: id,
      title: title,
      startDate: dates[0],
      endDate: dates[1],
      color: color
    };

    if (!isSameHour(dates[0], startDate) || !isSameDay(dates[0], startDate)) {
      updateTask(newTask);
    }
  }

  return bars.map(function (bar, index) {
    return !link ? React.createElement(DraggableCore, {
      key: index,
      onDrag: handleDrag,
      onStop: handleDragStop,
      disable: disable
    }, React.createElement("div", {
      onClick: function onClick() {
        return event({
          id: id,
          startDate: startDate,
          endDate: endDate,
          title: title,
          color: color,
          dark: dark
        });
      },
      style: {
        gridRow: "".concat(bar.gridRowStart, " / ").concat(bar.gridRowEnd),
        gridColumn: "".concat(bar.gridColumnStart, " / ").concat(bar.gridColumnEnd)
      },
      className: "task-bar ".concat(color).concat(dark ? "-color-dark" : "-color")
    }, React.createElement("span", {
      className: "task-bar__title"
    }, title))) : React.createElement("div", {
      onClick: function onClick() {
        return event({
          id: id,
          startDate: startDate,
          endDate: endDate,
          title: title,
          color: color,
          dark: dark
        });
      },
      style: {
        gridRow: "".concat(bar.gridRowStart, " / ").concat(bar.gridRowEnd),
        gridColumn: "".concat(bar.gridColumnStart, " / ").concat(bar.gridColumnEnd)
      },
      className: "task-bar ".concat(color).concat(dark ? "-color-dark" : "-color")
    }, React.createElement(MDBLink, {
      to: to,
      active: active,
      onClick: onClickLink,
      link: true,
      style: {
        color: "#fff",
        display: "inline",
        position: "static"
      }
    }, React.createElement("span", {
      className: "task-bar__title"
    }, title)));
  });
};

WeekTaskBar.propTypes = {
  event: PropTypes.func.isRequired,
  task: PropTypes.shape({
    color: PropTypes.string,
    endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    id: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    title: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateTask: PropTypes.func.isRequired,
  weekStart: PropTypes.instanceOf(Date).isRequired,
  disable: PropTypes.bool
};

var _PropTypes$shape;

function formatDate(date) {
  return format(date, "YYYY-MM-DDTHH:mm");
}

var TaskModal = function TaskModal(_ref) {
  var alertMsg = _ref.alertMsg,
      createTask = _ref.createTask,
      day = _ref.day,
      endDay = _ref.endDay,
      deleteTask = _ref.deleteTask,
      isOpen = _ref.isOpen,
      task = _ref.task,
      toggle = _ref.toggle,
      updateTask = _ref.updateTask,
      modalControlLabels = _ref.modalControlLabels,
      addTaskTitle = _ref.addTaskTitle,
      editTaskTitle = _ref.editTaskTitle,
      modalFormLabels = _ref.modalFormLabels,
      colors = _ref.colors;

  var _useState = useState(task.title || ""),
      _useState2 = _slicedToArray(_useState, 2),
      title = _useState2[0],
      setTitle = _useState2[1];

  var _useState3 = useState(day ? formatDate(startOfDay(day)) : formatDate(task.startDate)),
      _useState4 = _slicedToArray(_useState3, 2),
      startDate = _useState4[0],
      setStartDate = _useState4[1];

  var _useState5 = useState(day || endDay ? formatDate(endOfDay(endDay || day)) : formatDate(task.endDate)),
      _useState6 = _slicedToArray(_useState5, 2),
      endDate = _useState6[0],
      setEndDate = _useState6[1];

  var _useState7 = useState(task.color),
      _useState8 = _slicedToArray(_useState7, 2),
      colored = _useState8[0],
      setColor = _useState8[1];

  var _useState9 = useState(task.dark),
      _useState10 = _slicedToArray(_useState9, 2),
      darked = _useState10[0],
      setDark = _useState10[1];

  useEffect(function () {
    var parsedStart = parse(startDate);
    var parsedEnd = parse(endDate);
    var isAft = isAfter(parsedEnd, parsedStart);

    if (!day && isAft && (task.title !== title || task.startDate !== startDate || task.endDate !== endDate || task.color !== colored || task.dark !== darked)) {
      updateTask({
        id: task.id,
        title: title,
        startDate: parsedStart,
        endDate: parsedEnd,
        color: colored,
        dark: darked
      });
    }
  }, [title, startDate, endDate, colored, darked]);

  function formSubmit(e) {
    e.preventDefault();

    if (!isAfter(parse(endDate), parse(startDate))) {
      alert(alertMsg);
    } else {
      createTask({
        title: title,
        startDate: parse(startDate),
        endDate: parse(endDate),
        color: colored,
        dark: darked
      });
    }
  }

  return React.createElement(MDBModal, {
    isOpen: isOpen,
    toggle: toggle
  }, React.createElement(MDBModalHeader, {
    toggle: toggle
  }, !day && React.createElement("span", null, editTaskTitle), day && React.createElement("span", null, addTaskTitle)), React.createElement(MDBModalBody, null, React.createElement("form", {
    onSubmit: formSubmit
  }, React.createElement(MDBInput, {
    required: true,
    type: "textarea",
    name: "title",
    label: modalFormLabels[0],
    value: title,
    onInput: function onInput(e) {
      return setTitle(e.target.value);
    }
  }), React.createElement(MDBInput, {
    required: true,
    type: "datetime-local",
    name: "start",
    label: modalFormLabels[1],
    max: endDate,
    value: startDate,
    onChange: function onChange(e) {
      return setStartDate(e.target.value);
    }
  }), React.createElement(MDBInput, {
    required: true,
    type: "datetime-local",
    name: "end",
    label: modalFormLabels[2],
    min: startDate,
    value: endDate,
    onChange: function onChange(e) {
      return setEndDate(e.target.value);
    }
  }), React.createElement("span", null, modalFormLabels[3]), colors.map(function (_ref2) {
    var color = _ref2.color,
        title = _ref2.title,
        dark = _ref2.dark;
    var splited = color.split("-")[0];
    return React.createElement("div", {
      key: color,
      className: "custom-control custom-radio font-weight-bold",
      onClick: function onClick() {
        setColor(splited);
        setDark(dark);
      }
    }, React.createElement("input", {
      type: "radio",
      className: "custom-control-input",
      id: color,
      readOnly: true,
      checked: colored === splited
    }), React.createElement("label", {
      className: "custom-control-label text-".concat(splited),
      htmlFor: color
    }, title.charAt(0).toUpperCase() + title.slice(1)));
  }))), React.createElement(MDBModalFooter, null, !day && React.createElement(MDBBtn, {
    color: "danger",
    onClick: function onClick() {
      return deleteTask(task.id);
    }
  }, modalControlLabels[0]), React.createElement(MDBBtn, {
    color: "primary",
    onClick: toggle
  }, modalControlLabels[1]), day && React.createElement(MDBBtn, {
    color: "success",
    onClick: formSubmit
  }, modalControlLabels[2])));
};

TaskModal.propTypes = {
  alertMsg: PropTypes.string.isRequired,
  createTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  modalControlLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTaskTitle: PropTypes.string.isRequired,
  editTaskTitle: PropTypes.string.isRequired,
  modalFormLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  task: PropTypes.shape((_PropTypes$shape = {
    color: PropTypes.string,
    endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), Number]),
    id: PropTypes.string
  }, _defineProperty(_PropTypes$shape, "endDate", PropTypes.oneOfType([PropTypes.instanceOf(Date), Number])), _defineProperty(_PropTypes$shape, "title", PropTypes.string), _PropTypes$shape)),
  day: PropTypes.instanceOf(Date),
  colors: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

var TheMonthGrid = function TheMonthGrid(_ref) {
  var activeDate = _ref.activeDate,
      month = _ref.month,
      updateTask = _ref.updateTask,
      openModal = _ref.openModal,
      locale = _ref.locale,
      disable = _ref.disable;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      drag = _useState2[0],
      setDrag = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      dragStart = _useState4[0],
      setStart = _useState4[1];

  function handleMouseDown(e) {
    if (!e.ctrlKey) return;
    setDrag(true);
    var currentAreaDay = document.elementsFromPoint(e.clientX, e.clientY).find(function (element) {
      return element.dataset.day;
    });
    setStart(parse(currentAreaDay.dataset.day));
  }

  function handleMouseUp(e) {
    if (!drag) return;
    setDrag(false);
    var currentAreaDay = document.elementsFromPoint(e.clientX, e.clientY).find(function (element) {
      return element.dataset.day;
    });
    openModal({}, dragStart, parse(currentAreaDay.dataset.day));
  }

  if (month.length) {
    return React.createElement("div", {
      className: "month-grid",
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp
    }, React.createElement("div", {
      className: "grid-row"
    }, month[0].days.map(function (day) {
      return React.createElement(BaseTableCell, {
        head: true,
        key: day
      }, format(day, "ddd", {
        locale: locale
      }));
    })), month.map(function (week) {
      return React.createElement("div", {
        key: week.days[0],
        className: "grid-row week",
        style: {
          height: "".concat(week.tasks.length > 3 ? "calc(14vh + ".concat(week.tasks.length - 4, "*24px)") : "14vh")
        }
      }, week.days.map(function (day) {
        return React.createElement(BaseTableCell, {
          key: day,
          day: day,
          notCurrMonth: !isSameMonth(activeDate, day),
          today: isToday(day),
          event: openModal
        }, format(day, "D", {
          locale: locale
        }));
      }), React.createElement("div", {
        className: "week-presentation"
      }, week.tasks.map(function (task, taskIndex) {
        return React.createElement(TaskBar, {
          key: "".concat(task.startDate).concat(task.endDate).concat(task.id),
          taskIndex: taskIndex,
          task: task,
          weekDays: week.days,
          updateTask: updateTask,
          event: openModal,
          disable: disable
        });
      })));
    }));
  }

  return null;
};

TheMonthGrid.propTypes = {
  activeDate: PropTypes.instanceOf(Date).isRequired,
  month: PropTypes.arrayOf(PropTypes.shape({
    days: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    tasks: PropTypes.arrayOf(PropTypes.object)
  })).isRequired,
  updateTask: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  disable: PropTypes.bool
};

var TheWeekGrid = function TheWeekGrid(_ref) {
  var hours = _ref.hours,
      week = _ref.week,
      updateTask = _ref.updateTask,
      openModal = _ref.openModal,
      locale = _ref.locale,
      timeFormat = _ref.timeFormat,
      disable = _ref.disable;
  return React.createElement("div", null, React.createElement("div", {
    className: "grid-row"
  }, React.createElement(BaseTableCell, null), week.days.map(function (day) {
    return React.createElement(BaseTableCell, {
      head: true,
      today: isToday(day),
      key: day
    }, format(day, "ddd DD/MM", {
      locale: locale
    }));
  })), React.createElement("div", {
    className: "grid-row week"
  }, React.createElement(BaseTableCell, {
    double: true,
    head: true
  }), week.days.map(function (day) {
    return React.createElement(BaseTableCell, {
      double: true,
      today: isToday(day),
      day: day,
      key: day,
      event: openModal
    });
  }), React.createElement("div", {
    className: "week-presentation",
    style: {
      gridColumn: "2/9",
      top: 0
    }
  }, week.tasks.map(function (task, taskIndex) {
    return React.createElement(TaskBar, {
      key: "".concat(task.startDate).concat(task.endDate).concat(task.id),
      taskIndex: taskIndex,
      task: task,
      weekDays: week.days,
      updateTask: updateTask,
      weekGrid: true,
      event: openModal
    });
  }))), React.createElement("div", {
    className: "week week-grid"
  }, hours.map(function (hour) {
    return React.createElement(React.Fragment, {
      key: hour
    }, React.createElement(BaseTableCell, {
      head: true
    }, format(hour, timeFormat)), week.days.map(function (day) {
      return React.createElement(BaseTableCell, {
        day: setHours(day, format(hour, "H")),
        today: isToday(day),
        key: day,
        event: openModal
      });
    }));
  }), React.createElement("div", {
    className: "week-presentation"
  }, week.tasks.map(function (task, index) {
    return React.createElement(WeekTaskBar, {
      key: "".concat(task.startDate).concat(task.endDate).concat(task.id),
      updateTask: updateTask,
      task: task,
      index: index,
      allTasks: week.tasks,
      weekStart: week.days[0],
      event: openModal,
      disable: disable
    });
  }))));
};

TheWeekGrid.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  week: PropTypes.shape({
    days: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    tasks: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  updateTask: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired,
  disable: PropTypes.bool
};

function sort(items) {
  return items.sort(function (a, b) {
    return isBefore(a.startDate, b.startDate) ? -1 : 1;
  });
}

var TheListGrid = function TheListGrid(_ref) {
  var week = _ref.week,
      openModal = _ref.openModal,
      locale = _ref.locale,
      timeFormat = _ref.timeFormat,
      disable = _ref.disable;

  var _useState = useState(sort(week.tasks)),
      _useState2 = _slicedToArray(_useState, 2),
      tasks = _useState2[0],
      setTasks = _useState2[1];

  useEffect(function () {
    if (tasks !== week.tasks) {
      setTasks(sort(week.tasks));
    }
  }, [week]);

  if (!tasks.length) {
    return React.createElement("div", null, React.createElement("ul", {
      className: "list-grid"
    }, React.createElement(BaseTableCell, {
      head: true,
      list: true
    }, React.createElement("span", null, React.createElement("i", {
      className: "fa fa-calendar-alt"
    }), " ", "".concat(format(week.days[0], "DD.MM.YYYY", {
      locale: locale
    }), " - ").concat(format(week.days[6], "DD.MM.YYYY", {
      locale: locale
    }))), React.createElement("span", null, React.createElement("i", {
      className: "fa fa-clock"
    }), " all-day")), React.createElement(BaseTableCell, {
      list: true,
      event: function event() {
        return openModal({}, week.days[0]);
      }
    }, React.createElement("div", {
      className: "task-color"
    }), React.createElement("span", null, "---------"))));
  }

  return React.createElement("div", null, React.createElement("ul", {
    className: "list-grid"
  }, tasks.map(function (task) {
    return React.createElement(React.Fragment, {
      key: task.id
    }, React.createElement(BaseTableCell, {
      head: true,
      list: true
    }, React.createElement("span", null, React.createElement("i", {
      className: "fa fa-calendar-alt"
    }), " ", isSameDay(task.startDate, subMinutes(task.endDate, 1)) ? format(task.startDate, "DD.MM.YYYY", {
      locale: locale
    }) : "".concat(format(task.startDate, "DD.MM.YYYY", {
      locale: locale
    }), " - ").concat(format(task.endDate, "DD.MM.YYYY", {
      locale: locale
    }))), React.createElement("span", null, React.createElement("i", {
      className: "fa fa-clock"
    }), " ", differenceInMinutes(task.endDate, task.startDate) < 1440 ? "".concat(format(task.startDate, timeFormat), " - ").concat(format(task.endDate, timeFormat)) : "all-day")), React.createElement(BaseTableCell, {
      list: true,
      event: function event() {
        return !disable && openModal(task);
      }
    }, React.createElement("div", {
      className: "task-color ".concat(task.color)
    }), !task.link ? React.createElement("span", null, task.title) : React.createElement(MDBLink, {
      to: task.to,
      active: task.active,
      onClick: task.onClickList,
      style: {
        padding: "unset",
        color: "#000",
        width: "100%"
      }
    }, React.createElement("span", null, task.title))));
  })));
};

TheListGrid.propTypes = {
  week: PropTypes.shape({
    days: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    tasks: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired
};
TheListGrid.defaultProps = {
  disable: false
};

function changeDate(activeView, activeDate, amount) {
  var newDate = new Date();

  if (amount === 0) {
    return newDate;
  }

  switch (activeView) {
    case 'month':
      newDate = changeMonth(activeDate, amount);
      break;

    case 'week':
    case 'list':
      newDate = changeWeek(activeDate, amount);
      break;

    case 'day':
      newDate = changeDay(activeDate, amount);
      break;
  }

  return newDate;
}

function changeMonth(date, amount) {
  var newDate = amount < 0 ? subMonths(date, -amount) : addMonths(date, amount);
  return newDate;
}

function changeWeek(date, amount) {
  var newDate = amount < 0 ? subWeeks(date, -amount) : addWeeks(date, amount);
  return newDate;
}

function changeDay(date, amount) {
  var newDate = amount < 0 ? subDays(date, -amount) : addDays(date, amount);
  return newDate;
}

function getWeeks(date) {
  var wholeMonth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var start = wholeMonth ? startOfWeek(startOfMonth(date)) : startOfWeek(date);
  var end = wholeMonth ? endOfWeek(endOfMonth(date)) : endOfWeek(date);
  return addDayToWeek(0, [], start, end, wholeMonth);
}

function addDayToWeek(count, weeks, current, end, wholeMonth) {
  if (isBefore(current, end)) {
    var weekNumber = Math.floor(count / 7);
    weeks[weekNumber] = weeks[weekNumber] || {
      days: [],
      tasks: []
    };
    weeks[weekNumber].days.push(current);
    addDayToWeek(count + 1, weeks, addDays(current, 1), end, wholeMonth);
  }

  if (weeks.length < 6 && wholeMonth) {
    addDayToWeek(count, weeks, current, endOfWeek(addDays(end, 1)), wholeMonth);
  }

  return weeks;
}

function getHours(date) {
  var start = startOfDay(date);
  var end = endOfDay(date);
  return addHourToSet([], start, end);
}

function addHourToSet(set, current, end) {
  set.push(current);

  if (!isSameHour(current, end)) {
    addHourToSet(set, addHours(current, 1), end);
  }

  return set;
}

function addTasksToWeek(week, tasks) {
  var weekTasks = tasks.filter(function (task) {
    return isSameWeek(week.days[0], task.startDate) || isSameWeek(week.days[0], task.endDate) || isWithinRange(week.days[0], task.startDate, task.endDate);
  });
  week.tasks = weekTasks;
  return week;
}

var FullCalendar =
/*#__PURE__*/
function (_Component) {
  _inherits(FullCalendar, _Component);

  function FullCalendar(props) {
    var _this;

    _classCallCheck(this, FullCalendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FullCalendar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getWeeks", function (date) {
      var month = getWeeks(date, true);
      var week = month.filter(function (week) {
        return isSameWeek(week.days[0], _this.state.activeDate);
      })[0];

      if (_this.state.tasks.length) {
        var monthWithTasks = month.map(function (week) {
          return addTasksToWeek(week, _this.state.tasks);
        });
        var weekWithTasks = monthWithTasks.filter(function (week) {
          return isSameWeek(week.days[0], _this.state.activeDate);
        })[0];

        _this.setState({
          month: monthWithTasks,
          week: weekWithTasks
        });
      } else {
        _this.setState({
          month: month,
          week: week
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getHours", function (date) {
      var hours = getHours(date);

      _this.setState({
        hours: hours
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeView", function (activeView) {
      return _this.setState({
        activeView: activeView
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeDate", function (amount) {
      var newDate = changeDate(_this.state.activeView, _this.state.activeDate, amount);

      _this.setState({
        activeDate: newDate
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createTask", function (task) {
      return _this.setState(function (prevState) {
        return {
          tasks: [].concat(_toConsumableArray(prevState.tasks), [_objectSpread2({
            id: v1_1(),
            editDate: new Date()
          }, task)]),
          isModalOpen: false
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateTask", function (task) {
      return _this.setState(function (prevState) {
        task.editDate = new Date();

        var tasks = _toConsumableArray(prevState.tasks);

        var taskIndex = tasks.findIndex(function (item) {
          return item.id === task.id;
        });
        tasks[taskIndex] = task;
        tasks.sort(function (a, b) {
          return a.editDate - b.editDate;
        });
        return {
          tasks: tasks
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteTask", function (id) {
      if (!window.confirm(_this.state.confirmDeleteMsg)) return;

      _this.setState(function (prevState) {
        return {
          tasks: prevState.tasks.filter(function (task) {
            return task.id !== id;
          }),
          isModalOpen: false
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openModal", function (taskToUpdate, dayToUpdate, endDayToUpdate) {
      var disableEvents = _this.props.disableEvents;
      var isModalOpen = _this.state.isModalOpen;

      if (!disableEvents) {
        _this.setState({
          isModalOpen: !isModalOpen,
          taskToUpdate: taskToUpdate,
          dayToUpdate: dayToUpdate,
          endDayToUpdate: endDayToUpdate
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleModal", function () {
      var disableEvents = _this.props.disableEvents;
      var isModalOpen = _this.state.isModalOpen;

      if (!disableEvents) {
        _this.setState({
          isModalOpen: !isModalOpen
        });
      }
    });

    _this.state = {
      activeDate: _this.props.startDate,
      activeView: 'month',
      month: [],
      week: [],
      hours: [],
      isModalOpen: false,
      taskToUpdate: {},
      dayToUpdate: null,
      endDayToUpdate: null,
      tasks: _this.props.tasks,
      locale: _this.props.locale,
      weekFormat: _this.props.weekFormat,
      listFormat: _this.props.listFormat,
      controlLabels: _this.props.controlLabels,
      modalControlLabels: _this.props.modalControlLabels,
      addTaskTitle: _this.props.addTaskTitle,
      editTaskTitle: _this.props.editTaskTitle,
      modalFormLabels: _this.props.modalFormLabels,
      alertModalMsg: _this.props.alertModalMsg,
      confirmDeleteMsg: _this.props.confirmDeleteMsg,
      initialLink: _this.props.link
    };
    return _this;
  }

  _createClass(FullCalendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getWeeks(this.state.activeDate); // hours needs to be generated only once

      this.getHours(this.state.activeDate);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.activeDate !== this.state.activeDate) {
        this.getWeeks(this.state.activeDate);
      }

      if (prevState.tasks !== this.state.tasks) {
        if (this.props.onChange) {
          this.props.onChange(this.state.tasks);
        }

        this.getWeeks(this.state.activeDate);
      }

      if (this.props.tasks !== prevProps.tasks && this.state.tasks !== this.props.tasks) {
        this.setState({
          tasks: this.props.tasks
        });
      }

      if (this.props.locale !== prevState.locale) {
        this.setState({
          locale: this.props.locale
        });
      }

      if (this.props.weekFormat !== prevState.weekFormat) {
        this.setState({
          weekFormat: this.props.weekFormat
        });
      }

      if (this.props.listFormat !== prevState.listFormat) {
        this.setState({
          listFormat: this.props.listFormat
        });
      }

      if (this.props.controlLabels !== prevState.controlLabels) {
        this.setState({
          controlLabels: this.props.controlLabels
        });
      }

      if (this.props.modalControlLabels !== prevState.modalControlLabels) {
        this.setState({
          modalControlLabels: this.props.modalControlLabels
        });
      }

      if (this.props.addTaskTitle !== prevState.addTaskTitle) {
        this.setState({
          addTaskTitle: this.props.addTaskTitle
        });
      }

      if (this.props.editTaskTitle !== prevState.editTaskTitle) {
        this.setState({
          editTaskTitle: this.props.editTaskTitle
        });
      }

      if (this.props.modalFormLabels !== prevState.modalFormLabels) {
        this.setState({
          modalFormLabels: this.props.modalFormLabels
        });
      }

      if (this.props.alertModalMsg !== prevState.alertModalMsg) {
        this.setState({
          alertModalMsg: this.props.alertModalMsg
        });
      }

      if (this.props.confirmDeleteMsg !== prevState.confirmDeleteMsg) {
        this.setState({
          confirmDeleteMsg: this.props.confirmDeleteMsg
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          activeDate = _this$state.activeDate,
          activeView = _this$state.activeView,
          addTaskTitle = _this$state.addTaskTitle,
          alertModalMsg = _this$state.alertModalMsg,
          controlLabels = _this$state.controlLabels,
          dayToUpdate = _this$state.dayToUpdate,
          editTaskTitle = _this$state.editTaskTitle,
          endDayToUpdate = _this$state.endDayToUpdate,
          hours = _this$state.hours,
          initialLink = _this$state.initialLink,
          isModalOpen = _this$state.isModalOpen,
          listFormat = _this$state.listFormat,
          locale = _this$state.locale,
          modalControlLabels = _this$state.modalControlLabels,
          modalFormLabels = _this$state.modalFormLabels,
          month = _this$state.month,
          tasks = _this$state.tasks,
          taskToUpdate = _this$state.taskToUpdate,
          week = _this$state.week,
          weekFormat = _this$state.weekFormat;
      var _this$props = this.props,
          colors = _this$props.colors,
          disableEvents = _this$props.disableEvents,
          btnSizes = _this$props.btnSizes,
          btnSizesClassName = _this$props.btnSizesClassName,
          btnSizesColorsToday = _this$props.btnSizesColorsToday,
          btnSizesColorsMonthWeekList = _this$props.btnSizesColorsMonthWeekList;
      return React.createElement("div", {
        className: "full-calendar-plugin"
      }, React.createElement("div", {
        className: "calendar-controls"
      }, React.createElement(SwitchButtons, {
        btnSizesClassName: btnSizesClassName,
        btnSizes: btnSizes,
        btnSizesColors: btnSizesColorsToday,
        texts: [React.createElement("i", {
          className: "fa fa-chevron-left"
        }), React.createElement("i", {
          className: "fa fa-chevron-right"
        }), controlLabels[0]],
        leftEvt: function leftEvt() {
          return _this2.changeDate(-1);
        },
        middleEvt: function middleEvt() {
          return _this2.changeDate(1);
        },
        rightEvt: function rightEvt() {
          return _this2.changeDate(0);
        }
      }), React.createElement(CalendarHeader, {
        activeView: activeView,
        activeDate: activeDate,
        locale: locale
      }), React.createElement(SwitchButtons, {
        btnSizesClassName: btnSizesClassName,
        btnSizes: btnSizes,
        btnSizesColors: btnSizesColorsMonthWeekList,
        texts: controlLabels.slice(1),
        active: activeView === 'month' ? 0 : activeView === 'week' ? 1 : 2,
        leftEvt: function leftEvt() {
          return _this2.changeView('month');
        },
        middleEvt: function middleEvt() {
          return _this2.changeView('week');
        },
        rightEvt: function rightEvt() {
          return _this2.changeView('list');
        }
      })), React.createElement("div", {
        className: "calendar-grid mt-3"
      }, activeView === 'month' && React.createElement(TheMonthGrid, {
        activeDate: activeDate,
        month: month,
        tasks: tasks,
        updateTask: this.updateTask,
        openModal: this.openModal,
        locale: locale,
        disable: disableEvents,
        link: initialLink
      }), activeView === 'week' && React.createElement(TheWeekGrid, {
        week: week,
        hours: hours,
        tasks: tasks,
        updateTask: this.updateTask,
        openModal: this.openModal,
        locale: locale,
        timeFormat: weekFormat,
        disable: disableEvents,
        link: initialLink
      }), activeView === 'list' && React.createElement(TheListGrid, {
        week: week,
        hours: hours,
        tasks: tasks,
        updateTask: this.updateTask,
        openModal: this.openModal,
        locale: locale,
        timeFormat: listFormat,
        disable: disableEvents
      })), isModalOpen && React.createElement(TaskModal, {
        alertMsg: alertModalMsg,
        isOpen: isModalOpen,
        task: taskToUpdate,
        day: dayToUpdate,
        endDay: endDayToUpdate,
        createTask: this.createTask,
        updateTask: this.updateTask,
        deleteTask: this.deleteTask,
        toggle: this.toggleModal,
        modalControlLabels: modalControlLabels,
        addTaskTitle: addTaskTitle,
        editTaskTitle: editTaskTitle,
        modalFormLabels: modalFormLabels,
        colors: colors
      }));
    }
  }]);

  return FullCalendar;
}(Component);

FullCalendar.propTypes = {
  addTaskTitle: PropTypes.string,
  alertModalMsg: PropTypes.string,
  colors: PropTypes.array,
  confirmDeleteMsg: PropTypes.string,
  controlLabels: PropTypes.arrayOf(PropTypes.string),
  editTaskTitle: PropTypes.string,
  listFormat: PropTypes.string,
  locale: PropTypes.object,
  modalControlLabels: PropTypes.arrayOf(PropTypes.string),
  modalFormLabels: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  startDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
  tasks: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    id: PropTypes.string,
    startDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    title: PropTypes.string
  })),
  weekFormat: PropTypes.string,
  btnSizes: PropTypes.string,
  btnSizesColorsToday: PropTypes.array,
  btnSizesClassName: PropTypes.string
};
FullCalendar.defaultProps = {
  alertModalMsg: "Task's endDate must be after startDate!",
  confirmDeleteMsg: 'Are you sure you want to delete this task?',
  colors: ['elegant-color', 'danger-color', 'warning-color', 'success-color', 'info-color', 'default-color', 'primary-color', 'secondary-color'],
  locale: en,
  weekFormat: 'ha',
  listFormat: 'hh:mma',
  tasks: [],
  startDate: new Date(),
  controlLabels: ['Today', 'Month', 'Week', 'List'],
  modalControlLabels: ['Delete', 'Close', 'Add'],
  addTaskTitle: 'Add task',
  editTaskTitle: 'Edit task',
  modalFormLabels: ['Title', 'Start', 'End', 'Color'],
  disableEvents: false,
  btnSizesColorsToday: ['info', 'danger', 'danger'],
  btnSizesColorsMonthWeekList: ['info', 'info', 'success']
};

export default FullCalendar;
