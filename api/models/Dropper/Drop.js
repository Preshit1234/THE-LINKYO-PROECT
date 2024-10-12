const mongoose = require("mongoose");

const DropSchema = new mongoose.Schema({
    userId: { type : String, required: true },
    url: { type : String, required : true},
    product_name: { type: String, required: true, unique: true, sparse: true },
    short_desc: { type: String, required: true, max: 500 },
    product_pic: { type: String, default: "" },
    related_img: { type: String, default : "" },
    likes: { type: Array, default: "[]" },
    score: { type: String, required : true },
    tags: { type : Array, default: "[]" },
    owners_name : { type : String, default: "" },
    org_email : { type : String, default : "" },
    value : { type : String, default : ""},
    discount : { type : String, default : ""},
    isPaid : { type : Boolean, default : false },
},
    { timestamps: true },
);

module.exports = mongoose.model("Drop", DropSchema);