const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: false, unique: false },
        email: { type: String, required: true, unique: true },
        isEmailVerified: { type: Boolean, default: false },
        password: { type: String, required: false },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        fullName: { type: String, default: "" },
        profilepic: { type: String, default: "" },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        googleSubId: { type: String, default: null },
        about: { type: String, default: "" },
        isWelcomed: { type: Boolean, default: false }, // Tracks whether the user has submitted the welcome page form

        //Dropper details
        isDropper: { type: Boolean, default: false },
        belongsToOrg: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Organization",
            },
            {
                type: Number,
                default : 0,
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
