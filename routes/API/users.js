const express = require("express");
const router = express.Router();
const auth = require("../../config/middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

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

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/users/:id
// @desc    Get a user by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:search/:id
// @desc    Get a user's homework, classes, budget, todos, or activities by id
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
      default:
        res.json(user);
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
