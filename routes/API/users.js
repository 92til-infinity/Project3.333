const express = require("express");
const router = express.Router();
const auth = require("../../config/middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   GET api/users
// @desc    Get a list of all users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:role
// @desc    Get a list of all users by role
// @access  Public
router.get("/:role", async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("firstname", "First name is required")
      .not()
      .isEmpty(),
    check("lastname", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, role } = req.body;

    try {
      // See if user exists, send error if true
      let user = await User.findOne({ email });
      if (user) {
        alert("Email already in use, please use another email or login");
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Create the new user
      user = new User({
        firstname,
        lastname,
        email,
        password,
        role,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to the database
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      console.log(payload);

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          const safeUser = {
            ...user._doc,
            password: undefined,
            token,
          };

          if (err) throw err;
          res.json({ user: safeUser });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/users/id/:id
// @desc    Get a user by id
// @access  Public
router.get("/id/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:search/:id
// @desc    Get a user's homework, classes, budget, todos, social or activities by id
// @access  Public
router.get("/:search/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const searchTerm = req.params.search;

    switch (searchTerm) {
      case "homework":
        res.json(user.homework);
        break;
      case "classes":
        res.json(user.classes);
        break;
      case "activities":
        res.json(user.activities);
        break;
      case "budget":
        res.json(user.budget);
        break;
      case "todos":
        res.json(user.todos);
        break;
      case "social":
        res.json(user.social);
        break;
      default:
        res.json(user);
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/enroll/:id/:userid
// @desc    Add a class to a user
// @access  Private
router.put("/enroll/:id/:userid", async (req, res) => {
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

// @route   PUT api/users/activities
// @desc    Rewrite a user's activities
// @access  Private
router.put("/activities", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.activities = req.body;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/activities/:id
// @desc    Update an event
// @access  Private
router.put("/activities/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const eventID = req.params.id;
    const selected = User.find({ "_id": req.user.id, "activities.id": req.params.id });
    //const selected = user.find({ "activities.id": req.params.id });
    //const selected = user.activities;
    console.log(selected);
    // await user.save();
    // res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

// @route   PUT api/users/homework/:id
// @desc    Add homework to a user
// @access  Public
router.put("/homework/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.homework.push(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/:id
// @desc    Update a user's profile
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.social = req.body;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
