const router = require("express").Router();
const db = require("../../models");
const Budget = require("../../models/budgetDB")
const mongodb = require("mongodb");
const auth = require("../../config/middleware/auth");

router.post("/", auth, async (req, res) => {
  const { expenseTitle, amount, category } = req.body;
  lineItem = new Budget({ user: req.user.id, expenseTitle, amount, category });
  console.log(req.user.id);

  db.Budget.create(lineItem)
    .then((expense) => res.json(expense))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
  console.log("line 15");

});
router.get("/", auth, async (req, res) => {
  db.Budget.find({ user: req.user.id })
    .then((expense) => res.json(expense))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
  console.log("line 16");
})

router.route("/:id").delete((req, res) => {
  console.log("delete route");
  const id = req.params.id
  db.Budget.deleteOne({ _id: new mongodb.ObjectID(id) })
    .then((expense) => res.json(expense))
    .catch((err) => {
      console.log(err);
      res.status(422).end();
    });
})

module.exports = router;
