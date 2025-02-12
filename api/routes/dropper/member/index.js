const memberRouter = require("express").Router();
const Organization = require("../../../models/Dropper/Organization");
const Member = require("../../../models/Dropper/Member");
const User = require("../../../models/User/User");
const verify = require("../../../verifyToken");
const verifyMember = require("../../../verifyMemberToken");
const jwt = require("jsonwebtoken");
const Drop = require("../../../models/Dropper/Drop")

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

memberRouter.get("/login/data", verifyMember, async (req, res) => {
    try {
        let member = await Member.findOne({
            _id: req.member.memberId,
        }).populate("organization");

        response = {
            id: member.id,
            role: member.role,
            organization: {
                id: member.organization._id,
                name: member.organization.name,
                email: member.organization.email,
                createdBy: member.organization.createdBy,
                members: member.organization.members,
                drops: member.organization.drops,
            },
        };

        res.status(200).json(response);
        return;
    } catch (err) {
        res.status(500).json("Internal server error");
        console.log(err);
        return;
    }
});

memberRouter.get("/userId", async (req, res) => {
    try {
        const drops = await Member.find({ member: req.params.id });
        console.log(drops)
        res.json(drops);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = memberRouter;
