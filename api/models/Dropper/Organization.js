const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        contact: { type: String, required: true },
        address: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
        drops : [{type: mongoose.Schema.Types.ObjectId, ref: "Drop" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
