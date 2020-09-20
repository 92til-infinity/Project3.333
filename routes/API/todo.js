const router = require("express").Router();
const auth = require("../../config/middleware/auth");
const db = require("../../models");
const Todo = require("../../models/todoDB");

// @route   POST api/todos
// @desc    Create a new todo
// @access  Public
router.post("/", auth, async (req, res) => {
  try {
    const { id, text } = req.body;
    todo = new Todo({ user: req.user.id, id, text });
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/todos
// @desc    Get all todos matching current user ID
// @access  Private
router.get("/", auth, async (req, res) => {
  await db.Todo.find({ user: req.user.id })
    .then((todo) => res.json(todo))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
});

// @route   GET api/todos/:desc
// @desc    Get all complete todos given a true or false value
// @access  Private
router.get("/:desc", auth, async (req, res) => {
  await db.Todo.find({
    $and: [{ user: req.user.id }, { complete: req.params.desc }],
  })
    .then((todo) => res.json(todo))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
});

// @route   PUT api/todos/:id
// @desc    Update an existing todo
// @access  Public
router.put("/:id", async (req, res) => {
  await db.Todo.updateOne({ id: req.params.id }, req.body)
    .then((todo) => res.json(todo))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
});

// @route   DELETE api/todos/:id
// @desc    Delete todo with matching id
// @access  Public
router.delete("/:id", async (req, res) => {
  await db.Todo.findOneAndDelete({ id: req.params.id })
    .then((todo) => res.json(todo))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
});

module.exports = router;
