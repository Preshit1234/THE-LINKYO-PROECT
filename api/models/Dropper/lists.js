const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title : { type: String, required: true, unique: true }, //For ex. Top Featured Drops
    type : { type: String }, //For ex. isPaid or not
    tags : { type: String }, //For ex. AI, ML Modelling, etc
    content : { type: Array }, //Actual Drops
},
    { timestamps: true },
);

module.exports = mongoose.model("Lists", ListSchema);