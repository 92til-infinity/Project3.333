const router = require("express").Router();
const db = require("../models");
// const todoRouter = require("./API/todo");

router.route("/api/reactBudgets").post((req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  // console.log(db);
  db.Budget.create(req.body)
    .then((expense) => res.json(expense))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });

  // db.Todo.create(
  //     req.body
  // )
  //     .then(todo => res.json(todo))
  //     .catch(err => { console.log(err); res.status(422).end() });
});

// router.use("/api", todoRouter);

router.route("/api").get((req, res) => {
  console.log(req);
});
module.exports = router;
