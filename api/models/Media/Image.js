const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    hash: { type: String, required: true, unique: true }, // Used to prevent duplicates
});

module.exports = mongoose.model("Image", imageSchema);
