const mongoose = require("mongoose");

const RolesPermissionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        role: { type: String, default: null },
        permissions:[{
            permission_name: String,
            permission_value: [String] //Create, Read, Update, Delete
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("RolesPersmission", RolesPermissionSchema);