const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    gif: {type: String, required: true},
});

module.exports = mongoose.model("exercises", exerciseSchema);