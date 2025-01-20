/**
 * Imported all dropper related routes in this file and export it.
 */

const dropperRouter = require("express").Router();
const organizationRoute = require("./organization");

dropperRouter.use("/organization", organizationRoute);

module.exports = dropperRouter;
