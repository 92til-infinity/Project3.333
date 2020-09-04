const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    //  string
    text: {
        type: String,
        default: ""
    }

});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo