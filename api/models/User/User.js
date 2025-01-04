const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: false, unique: false },
        email: { type: String, required: true, unique: true },
        isEmailVerified: { type: Boolean, default: false },
        password: { type: String, required: false },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        profilepic: { type: String, default: "" },
        isAdmin: { type: Boolean, default: false },
        isDropper: { type: Boolean, default: false },
        followers: { type: Array, default: [] },
        followings: { type: Array, default: [] },
        googleSubId: { type: String, default: null },
        about: { type: String, default: "" },
        isWelcomed: { type: Boolean, default: false }, // Tracks whether the user has submitted the welcome page form
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
