/**
 * Imported all dropper related routes in this file and export it.
 */

const dropperRouter = require("express").Router();
const organizationRoute = require("./organization");
const listsRoute = require("./lists/lists");
const defaultListRoute = require("./lists/defaultLists");
const memberRoute = require("./member");
const dropRoute = require("./drop");

dropperRouter.use("/organization", organizationRoute);
dropperRouter.use("/lists", listsRoute);
dropperRouter.use("/lists/defaultlist", defaultListRoute);
dropperRouter.use("/member", memberRoute);
dropperRouter.use("/drop", dropRoute);

module.exports = dropperRouter;
