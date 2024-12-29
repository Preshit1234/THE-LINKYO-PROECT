const mongoose = require("mongoose");

const TempUserSchema = new mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
        tempPassword: { type: String }, // temporary random generated password
        userConsentChecked: { type: Boolean },
        accessToken: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TempUser", TempUserSchema);
