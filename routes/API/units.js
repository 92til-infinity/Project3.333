const express = require("express");
const router = express.Router();
const auth = require("../../config/middleware/auth");
const { check, validationResult } = require("express-validator");

const Unit = require("../../models/Unit");
const User = require("../../models/User");

// @route   GET api/units
// @desc    Get a list of all classes
// @access  Public
router.get("/", async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/units
// @desc    Create a class listing
// @access  Private
router.post(
  "/",
  [
    check("title", "Class title is required")
      .not()
      .isEmpty(),
    check("startdate", "Provide a valid start date for this class")
      .not()
      .isEmpty(),
    check("enddate", "Provide a valide end date for this class")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      teacher,
      startdate,
      enddate,
      days,
      starttime,
      endtime,
      enrolled,
      archive,
    } = req.body;

    const unitFields = {};
    if (title) unitFields.title = title;
    if (teacher) unitFields.teacher = teacher;
    if (startdate) unitFields.startdate = startdate;
    if (enddate) unitFields.enddate = enddate;
    if (days) unitFields.days = days;
    if (starttime) unitFields.starttime = starttime;
    if (endtime) unitFields.endtime = endtime;
    if (enrolled) unitFields.enrolled = enrolled;
    if (archive) unitFields.archive = archive;

    try {
      unit = new Unit(unitFields);
      await unit.save();
      res.json(unit);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/units/homework/:id
// @desc    Get all homework from a class
// @access  Public
router.get("/homework/:id", async (req, res) => {
  try {
    const unit = await Unit.findOne({ _id: req.params.id });
    res.json(unit.homework);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/units/homework/:id
// @desc    Add homework to a class
// @access  Private
router.put(
  "/homework/:id",
  [
    check("assignment", "Assignment is required")
      .not()
      .isEmpty(),
    check("duedate", "Due date is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { assignment, duedate, details } = req.body;

    const newHomework = {
      assignment,
      duedate,
      details,
    };

    try {
      const unit = await Unit.findById(req.params.id);
      unit.homework.push(newHomework);
      await unit.save();
      res.json(unit);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/units/enroll/:id/:userid
// @desc    Add a user to a class AND a class to a user
// @access  Private
router.put("/enroll/:id/:userid", async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    unit.enrolled.push(req.params.userid);
    await unit.save();
    res.json(unit);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }

  try {
    const user = await User.findById(req.params.userid);
    user.classes.push(req.params.id);
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
