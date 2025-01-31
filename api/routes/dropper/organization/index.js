/**
 * Imported all dropper organization related routes in this file and export it.
 */

const organizationRouter = require("express").Router();
const Organization = require("../../../models/Dropper/Organization");
const Member = require("../../../models/Dropper/Member");
const User = require("../../../models/User/User");
const verify = require("../../../verifyToken");
const { default: mongoose } = require("mongoose");

organizationRouter.post("/create", verify, async (req, res) => {
    let newOrganization = {};
    let newMember = {};
    let updatedOrganization = {};
    let updatedUserData = {};

    // Create a new Organization
    let newOrganizationRequest = new Organization({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        createdBy: req.user.id,
    });
    try {
        let res = await newOrganizationRequest.save();
        newOrganization = res;
    } catch (err) {
        res.status(500).json({
            message: "Organization creation failed",
            error: err,
        });
        console.log("Organization creation error: ", err);
        return;
    }

    // Create a new Member
    const newMemberRequest = new Member({
        organization: newOrganization._id,
        user: req.user.id,
        role: "admin",
    });
    try {
        let res = await newMemberRequest.save();
        console.log("New member creation request response: ", res);
        newMember = res;
    } catch (err) {
        res.status(500).json({ message: "", error: err });
        console.log("Member creation error: ", err);
        return;
    }

    // Update the new organization members list
    try {
        let res = await Organization.findOneAndUpdate(
            { _id: newOrganization._id },
            { members: [newMember._id] },
            { new: true }
        );
        console.log("Updated Organization data: ", res);
        updatedOrganization = res;
    } catch (err) {
        res.status(500).json({
            message: "Organization updation failed",
            error: err,
        });
        console.log("Organization updation error: ", err);
        return;
    }

    // Update the requester user data
    try {
        let res = await User.findOneAndUpdate(
            { _id: req.user.id },
            {
                isDropper: true,
                belongsToOrg: [updatedOrganization._id],
            },
            { new: true }
        );

        console.log("Updated User Data: ", res);
        updatedUserData = res;
    } catch (err) {
        res.status(500).json({
            message: "User updation failed",
            error: err,
        });
        console.log("User updation error: ", err);
        return;
    }

    res.status(200).json({
        message: "Organization registered successfully",
        desc: "Assigned admin role the requester user",
        organizationData: updatedOrganization,
        user: {
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
        },
    });
});

organizationRouter.put("/update", (req, res) => {
    res.json({ message: "Organization Updated Successfully" });
});

organizationRouter.delete("/delete", (req, res) => {
    res.json({ message: "Organization Deleted Successfully" });
});

module.exports = organizationRouter;
