const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// Define the upload path
const uploadPath = path.join(__dirname, "../uploads/images");

// Ensure the directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log(`Created directory: ${uploadPath}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Save files to the uploads/images folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Allow only image files
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB file size limit
});

module.exports = upload;
