const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    display : { type : String, required: true },
},
    { timestamps: true },
);

module.exports = mongoose.model("Test", TestSchema);

