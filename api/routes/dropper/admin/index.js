const adminRouter = require("express").Router;
const registerRoute = require("./register");
const removeRoute = require("./remove");
const updateRoute = require("./update");
const viewRoute = require("./view");

adminRouter.use("/register", registerRoute);
adminRouter.use("/remove", removeRoute);
adminRouter.use("/update", updateRoute);
adminRouter.use("/view", viewRoute);

module.exports = adminRouter;
