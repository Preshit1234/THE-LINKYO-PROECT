const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
    {
        permission_name:{
            type: String,
            required:  true
        },
        is_default:{
            type: Number,
            default : 0 // 0 -> Not default, 1-> Default
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Persmission", PermissionSchema);