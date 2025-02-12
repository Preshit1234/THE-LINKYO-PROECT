const dropRouter = require("express").Router();
const Drop = require("../../../models/Dropper/Drop");
const verifyMember = require("../../../verifyMemberToken");

dropRouter.get("/all", verifyMember, async (req, res) => {
    let orgId = req.member.organizationId;

    try {
        let drops = await Drop.find({ org: orgId });
        res.status(200).json(drops);
    } catch (err) {
        console.log("Drop route error: ", err);
        res.status(500).json({ message: "Error", error: err });
    }
});

module.exports = dropRouter;
