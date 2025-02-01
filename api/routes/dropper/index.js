/**
 * Imported all dropper related routes in this file and export it.
 */

const dropperRouter = require("express").Router();
const organizationRoute = require("./organization");
const listsRoute = require("./lists/lists");
const memberRoute = require("./member");
const defaultListRoute = require("./lists/defaultLists");

dropperRouter.use("/organization", organizationRoute);
dropperRouter.use("/lists", listsRoute);
dropperRouter.use("/member/", memberRoute);
dropperRouter.use("/lists/defaultlist", defaultListRoute);



module.exports = dropperRouter;
