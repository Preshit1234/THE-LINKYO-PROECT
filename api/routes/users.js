const router = require("express").Router();
const User = require("../models/User/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            req.status(500).json(err);
        }
    } else {
        res.status(403).json("you can update only your account");
    }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch (err) {
            req.status(500).json(err);
        }
    } else {
        res.status(403).json("you can delete only your account");
    }
});

//GET

router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        req.status(500).json(err);
    }
});

//GET ALL USER

router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const user = query
                ? await User.find().sort({ _id: -1 }).limit(10)
                : await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you are not allowed to see all users");
    }
});

//GET USER STATISTICS

router.get("/stats", async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1);
    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.params.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $push: { followings: req.params.id },
                });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't follow yourself");
    }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.params.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({
                    $pull: { followings: req.params.id },
                });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't unfollow yourself");
    }
});

// Update user data on welcome page form submission
router.post("/welcome", verify, async (req, res) => {
    let requestBody = req.body;
    let requestByUser = req.user; // User who sent the request

    try {
        let updatedUserData = await User.findOneAndUpdate(
            { _id: requestByUser.id },
            {
                fullName: requestBody.fullName,
                about: requestBody.userBio,
                profilepic: requestBody.profilepic,
                isWelcomed: true,
            },
            {
                new: true,
            }
        );
        let newUserData = {
            id: updatedUserData._id,
            username: updatedUserData.username,
            email: updatedUserData.email,
            isEmailVerified: updatedUserData.isEmailVerified,
            googleSubId: updatedUserData.googleSubId,

            firstName: updatedUserData.firstName,
            lastName: updatedUserData.lastName,
            fullName: updatedUserData.fullName,
            about: updatedUserData.about,

            profilepic: updatedUserData.profilepic,
            followers: updatedUserData.followers,
            followings: updatedUserData.followings,

            isDropper: updatedUserData.isDropper,
            belongsToOrgs: updatedUserData.belongsToOrg,

            isWelcomed: updatedUserData.isWelcomed,
            createdAt: updatedUserData.createdAt,
        };
        res.status(200).json({
            message: "User updated successfully",
            newUserData: newUserData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "User update failed", error: err });
    }
});

router.post("/check/username", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }).exec();
        if (user) {
            res.status(200).json({
                message: "username exists",
            });
        } else {
            res.status(200).json({
                message: "username does not exists",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
});

// tuza localhost:8080/

module.exports = router;
