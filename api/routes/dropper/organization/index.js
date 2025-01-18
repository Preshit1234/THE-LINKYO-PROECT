/**
 * Imported all dropper organization related routes in this file and export it.
 */

const organizationRouter = require("express").Router();
const Organization = require("../../../models/Dropper/Organization");

organizationRouter.post("/create", async (req, res) => {
    let newOrganizationData = new Organization({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
    });
    try {
        let newOrganization = await newOrganizationData.save();
        console.log(newOrganization);
        res.status(200).json({
            message: "Organization Registered Successfully",
            data: {
                id: newOrganization._id,
                name: newOrganization.name,
            },
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

organizationRouter.put("/update", (req, res) => {
    res.json({ message: "Organization Updated Successfully" });
});

organizationRouter.delete("/delete", (req, res) => {
    res.json({ message: "Organization Deleted Successfully" });
});

module.exports = organizationRouter;
