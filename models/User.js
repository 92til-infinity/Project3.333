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
      github: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      pinterest: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
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
