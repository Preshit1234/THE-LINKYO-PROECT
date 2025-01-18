// const dotenv = require("dotenv");
require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const dropRoute = require("./routes/drops");
const testRoute = require("./routes/test");
const dropperRoute = require("./routes/dropper");
const imagesRoute = require("./routes/image");
const path = require("path");

mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
    expressSession({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb();
        };
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb();
        };
    }
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

//Serve files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth/", authRoute);
app.use("/api/users/", userRoute);
app.use("/api/drops/", dropRoute);
app.use("/api/test/", testRoute);
app.use("/api/dropper", dropperRoute);
app.use("/api/image", imagesRoute);

app.get("/api/test", (req, res) => {
    res.json({ success: "Hello World" });
});

app.listen(8800, () => {
    console.log("Backend Server is running");
});
