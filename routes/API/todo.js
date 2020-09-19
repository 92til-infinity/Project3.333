const router = require("express").Router();
const auth = require("../../config/middleware/auth");
const db = require("../../models");
const Todo = require("../../models/todoDB");

// router.route("/todos", auth).post((req, res) => {

//   console.log(req.body);
//   db.Todo.create(req.body)
//     .then((todo) => res.json(todo))
//     .catch((err) => {
//       console.log(err);
//       res.status(422).end();
//     });
// });

// POST is working fine, need to shore up the model and add routes for
// DELETE, and PUT

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

router.get("/:id", auth, async (req, res) => {
  db.Todo.find({ user: req.params.id })
    .then((todo) => res.json(todo))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
});

module.exports = router;
