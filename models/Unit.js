const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  days: {
    type: [String],
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  starttime: {
    type: String,
  },
  endtime: {
    type: String,
  },
  enrolled: {
    type: [String],
  },
  archive: {
    type: Boolean,
    default: false,
  },
  homework: [
    {
      assignment: {
        type: String,
        required: true,
      },
      duedate: {
        type: Date,
        required: true,
      },
      details: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Unit = mongoose.model("unit", UnitSchema);
