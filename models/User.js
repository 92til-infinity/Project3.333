const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Teacher", "Student"],
      default: "Student",
    },
    classes: {
      type: [String],
    },
    activities: {
      type: [Object],
    },
    budget: {
      type: String,
    },
    todos: {
      type: [String],
    },
    social: {
      type: [Object],
    },
    homework: [
      {
        unitId: {
          type: String,
          required: true,
        },
        unitName: {
          type: String,
          required: true,
        },
        assignment: {
          type: String,
          required: true,
        },
        duedate: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
