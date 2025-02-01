const router = require("express").Router();
const Drop = require("../models/Dropper/Drop");
const User = require("../models/User/User");
const verify = require("../verifyToken");
const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory as buffers

const fileFilter = (req, file, cb) => {
    // Accept only image files with specific MIME types
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true); // Accept the file
    } else {
        cb(
            new Error(
                "Invalid file type. Only JPEG, JPG, and PNG images are allowed."
            ),
            false
        ); // Reject the file
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
    },
});

//CREATE A DROP

router.post(
    "/add",
    upload.fields([
        { name: "productPic", maxCount: 1 }, // Single file for profile picture
        { name: "relatedImg", maxCount: 3 }, // Up to 3 files for images
    ]),
    async (req, res) => {
        console.log("Request body: ", req.body);
        //res.status(200).json({message: "Testing"});
        //return;
        const {
            userId,
            product_name,
            url,
            short_desc,
            tagline,
            tags,
            owners_name,
            org_email,
            pin,
            value,
            discount,
        } = req.body;
        const productPic = req.files["productPic"]
            ? req.files["productPic"][0].buffer.toString("base64")
            : null;
        const relatedimg = req.files["relatedImg"]
            ? req.files["relatedImg"].map((file) =>
                  file.buffer.toString("base64")
              )
            : [];
        try {
            const tagsArray = tags.split(",").map(tag => tag.trim());
            //const tagsArray = tags.map(tag => tag.trim());
            const newDrop = new Drop({
                userId,
                product_name,
                url,
                short_desc,
                tagline,
                tags: tagsArray,
                owners_name,
                org_email,
                pin,
                value,
                discount,
                productPic,
                relatedimg,
            });
            const savedDrop = await newDrop.save();
            res.status(200).json(savedDrop);
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

//Get random DROPS
router.get("/random", async (req, res) => {
    const type = req.query.type;
    let drop;
    try {
        if (type === "paid") {
            drop = await Drop.aggregate([
                { $match: { isPaid: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            drop = await Drop.aggregate([
                { $match: { isPaid: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(drop);
    } catch (err) {
        res.status(200).send(err);
    }
});

//GET ALL DROPS

router.get("/getall", async (req, res) => {
    const query = req.query.new;
    let drops;
    try {
        if (query) {
            drops = await Drop.find().sort({ createdAt: -1 }).limit(2);
        } else {
            drops = await Drop.find();
        }
        res.status(200).json(drops);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE A DROP

router.put("/:id", async (req, res) => {
    try {
        const drop = await Drop.findById(req.params.id);
        if (drop.userId === req.body.userId) {
            await drop.updateOne({ $set: req.body });
            res.status(200).json("the drop has been updated");
        } else {
            res.status(403).json("You can only update your drop");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE A DROP

router.delete("/:id", async (req, res) => {
    try {
        const drop = await Drop.findById(req.params.id);
        if (drop.userId === req.body.userId) {
            await drop.deleteOne();
            res.status(200).json("the drop has been deleted");
        } else {
            res.status(403).json("You can only delete your drop");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//LIKE A DROP

router.put("/:id/like", async (req, res) => {
    try {
        const drop = await Drop.findById(req.params.id);
        if (!drop.likes.includes(req.body.userId)) {
            await drop.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The drop has been liked");
        } else {
            await drop.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The drop has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET A DROP

router.get("/:id", async (req, res) => {
    try {
        const drop = await Drop.findById(req.params.id);
        res.status(200).json(drop);
    } catch (err) {
        res.status(200).json(err);
    }
});

//GETALL DROP According to follow

router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userDrops = await Drop.find({ userId: currentUser._id });
        const followDrops = await Promise.all(
            currentUser.followings.map((followId) => {
                return Drop.find({ userId: followId });
            })
        );
        res.json(userDrops.concat(...followDrops));
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
