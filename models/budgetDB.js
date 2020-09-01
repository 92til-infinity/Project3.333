const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    expenseTitle: {
        type: String,
        required: true
    },
    // amount of the budget item in. no dollar
    amount: {
        type: Number,
        default: ""
    },
    //selected from the drop down menu. drop downs control input better
    category: {
        type: String,
        default: "",
    },

});

const Budget = mongoose.model("budget", budgetSchema);

module.exports = Budget;