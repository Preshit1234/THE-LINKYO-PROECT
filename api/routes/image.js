const router = require("express").Router();
const crypto = require("crypto");
const fs = require("fs");
const sharp = require("sharp");
const Image = require("../models/Media/Image");
const upload = require("../config/imageUpload");

router.post("/test", (req, res) => {
    console.log("Test request file property: ", req.file);
    console.log("Test request image property: ", req.get("image"));
    res.status(200).json({
        message: "Test Successful",
        file: req.file,
        imgae: req.image,
    });
});
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const file = req.file;

        // Generate a hash (SHA-256) to check for duplicates
        const fileBuffer = fs.readFileSync(file.path);
        const hash = crypto
            .createHash("sha256")
            .update(fileBuffer)
            .digest("hex");

        // Check if the image already exists in the database
        const existingImage = await Image.findOne({ hash });
        if (existingImage) {
            // If duplicate, delete the newly uploaded file
            fs.unlinkSync(file.path);
            return res.status(400).json({
                message: "Duplicate image detected.",
                existingImagePath: existingImage.path,
            });
        }

        // Process the image (resize example)
        const processedPath = `uploads/images/resized-${file.filename}`;
        await sharp(file.path).resize(500, 500).toFile(processedPath);

        // Save metadata in the database
        const newImage = new Image({
            name: file.originalname,
            path: processedPath,
            size: file.size,
            mimetype: file.mimetype,
            hash,
        });
        await newImage.save();
        res.status(200).json({
            message: "Image uploaded successfully!",
            image: newImage,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
