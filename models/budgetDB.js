const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    expenseTitle: {
        type: String,
        required: true
    },
    // url string for thumbnail image
    amount: {
        type: Number,
        default: ""
    },
    // url for recipe web page - unique index
    category: {
        type: String,
        default: "",
    },
    created: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

budgetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });
// budgetSchema will expire after 30 days = 2592000 seconds
const Budget = mongoose.model("budget", budgetSchema);

module.exports = Budget;