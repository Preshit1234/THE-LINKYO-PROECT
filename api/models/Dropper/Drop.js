const mongoose = require("mongoose");

const DropSchema = new mongoose.Schema({
    userId: { type : String, required : true},
    url: { type : String, required : true},
    product_name: { type: String, required: true, unique: true, sparse: true },
    short_desc: { type: String, max: 500, required: true },
    productPic: { type: String, default: "" },
    tagline: {type: String},
    relatedImg: { type: Array, default : "[]" },
    likes: { type: Array, default: "[]" },
    score: { type: String, },
    tags: { type : Array, default: "[]" },
    owners_name : { type : String, default: "" },
    org_email : { type : String, default : "" },
    pin: {type: Number},
    value : { type : String, default : ""},
    discount : { type : String, default : ""},
    isPaid : { type : Boolean, default : false },
    org: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" }
    /*
        let drop = Drop.findOne({_id: id}).populate('org').exec();
        dropOrg = drop.data.org;
        dropOrg = {Organization Model}

        dropOrg.name
    */
},
    { timestamps: true },
);

module.exports = mongoose.model("Drop", DropSchema);