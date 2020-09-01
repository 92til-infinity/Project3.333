const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoTitle: {
        type: String,
        required: true
    },
    // amount of the budget item in. no dollar
    amount: {
        type: Number,
        default: ""
    },


});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;