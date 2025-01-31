const memberRouter = require("express").Router();
const Organization = require("../../../models/Dropper/Organization");
const Member = require("../../../models/Dropper/Member");
const User = require("../../../models/User/User");
const verify = require("../../../verifyToken");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

memberRouter.post("/login", verify, async (req, res) => {
    const reqUser = req.user;
    const reqBody = req.body;
    let memberData;

    try {
        let result = await Member.findOne({
            organization: reqBody.orgId,
            user: reqUser.id,
        });
        if (!result) {
            res.status(401).json({
                message: "Member not found",
            });
            return;
        }
        memberData = {
            userId: result.user,
            organizationId: result.organization,
            memberId: result._id,
        };
    } catch (err) {
        console.log("Error while searching for the member: ", err);
        res.status(500).json({
            message: "Internal Server Error at member model",
            error: err,
        });
        return;
    }

    let accessToken = jwt.sign(memberData, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });

    res.status(200).json({
        message: "Member login successfull",
        accessToken: accessToken,
    });
});

module.exports = memberRouter;
