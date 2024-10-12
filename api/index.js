const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const dropRoute = require("./routes/drops");
const cors = require("cors");
const testRoute = require("./routes/test");


dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
})
.then(()=>console.log("DB Connection Successful"))
.catch(err=>console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ origin : "https://linlyo.io"}));

app.use("/api/auth", authRoute);
app.use("/api/users/", userRoute);
app.use("/api/drops/", dropRoute);
app.use("/api/test", testRoute);

app.get("/api/test", (req, res) => {
    res.json({ success: "Hello World"});
});

app.listen(8800, () => {
    console.log("Backend Server is running");
});