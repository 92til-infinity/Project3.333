const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
