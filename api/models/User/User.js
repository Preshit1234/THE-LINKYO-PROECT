const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    isEmailVerified: { type: Boolean, default: false },
    password: { type: String, required: false },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    profilepic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    isDropper: {  type: Boolean, default: false },
    followers: { type: Array, default:[] },
    followings: { type: Array, default:[] },
},
    { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);