// const dotenv = require("dotenv");
require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const dropRoute = require("./routes/drops");
const testRoute = require("./routes/test");
const dropperRoute = require("./routes/dropper");
const imagesRoute = require("./routes/image");
const path = require("path");
const adminPermissionRoute = require("./routes/dropper/Roles/adminRoute")

mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use(cors());
app.use(function (req, res, next) {
    // Allow api access only to these request origins
    const allowedOrigins = [
        "https://linkyo.io",
        "http://localhost:3000",
        process.env.CLIENT_URL,
    ];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin); // update to match the domain you will make the request from
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        res.header("Access-Control-Allow-Credentials", "true");
    }

    if (req.method === "OPTIONS") {
        return res.sendStatus(204); // Handle preflight
    }

    next();
});

//Serve files from the uploads folder
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res) => {
            res.setHeader(
                "Cache-Control",
                "public, max-age=31536000, immutable"
            );
        },
    })
);

app.use("/api/auth/", authRoute);
app.use("/api/users/", userRoute);
app.use("/api/drops/", dropRoute);
app.use("/api/test/", testRoute);
app.use("/api/dropper", dropperRoute);
app.use("/api/image", imagesRoute);
app.use("/api/admin", adminPermissionRoute);

app.get("/api/test", (req, res) => {
    res.json({ success: "Hello World" });
});

app.listen(8800, () => {
    console.log("Backend Server is running");
});
