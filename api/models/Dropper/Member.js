const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, default: null },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
