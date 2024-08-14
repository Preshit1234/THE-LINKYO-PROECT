const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    linktype : { type : String, required : true, default : [] },
},
    { timestamps: true },
);

module.exports = mongoose.model("Link", LinkSchema);