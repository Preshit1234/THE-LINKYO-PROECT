const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
        },
        role: { type: String, default: null },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
