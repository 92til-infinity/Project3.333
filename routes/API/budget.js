const router = require("express").Router();
const db = require("../../models");

router.route("/").post((req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  // console.log(db);
  db.Budget.create(req.body)
    .then((expense) => res.json(expense))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });

});
router.route("/").get((req, res) => {
  db.Budget.find()
    .then((expense) => res.json(expense))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
})

router.route("/:id").get((req, res) => {
  console.log("delete route");
  const id = req.params.id
  db.Budget.findByIdAndDelete(id)
    .then((expense) => res.json(expense))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
})

module.exports = router;
