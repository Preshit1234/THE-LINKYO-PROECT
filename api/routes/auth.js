const router = require("express").Router();
const User = require("../models/User/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const helper = require("../helper");
const passport = require("passport");
const TempUser = require("../models/User/TempUser");
const RenderVerificationEmail = require("../templates/RenderVerificationEmail");

// Functions

// Routers
//REMEMBER, POST = Creating, PUT = Updating, GET = Fetching

// Testing mock data and its response from mongo db
router.post("/register/test", async (req, res) => {
    console.log(req.body);

    let record = await User.findOne({ email: req.body.email }).exec();

    console.log(record);

    record
        ? console.log("Record exists")
        : console.log("Record does not exists");

    res.status(200).json(record);
});

// Google login and registration
router.post("/google", async (req, res) => {
    const googleUserData = req.body.googleUserData;

    if (!googleUserData) {
        res.status(403).json({
            error: true,
            message: "Data not found",
        });
    } else {
        // get the user that exists in the database
        let user = await User.findOne({ googleSubId: googleUserData.sub });
        console.log(user);

        // if user record does not exixts then create new user and redirect to profile creation page
        if (!user) {
            const newUser = new User({
                googleSubId: googleUserData.sub,
                firstName: googleUserData.given_name,
                lastName: googleUserData.family_name,
                email: googleUserData.email,
                isEmailVerified: googleUserData.email_verified,
                profilepic: googleUserData.picture,
            });
            try {
                let thisNewUser = await newUser.save();
                console.log("Attempted new google user registration");
                console.log(thisNewUser);
                res.status(201).json({
                    error: false,
                    message: "Attempted new google user registration",
                    data: thisNewUser,
                });
            } catch (err) {
                console.log(err);
                if (err.keyValue.email) {
                    res.status(500).json({
                        error: true,
                        message: "Email already exists",
                    });
                } else {
                    res.status(500).json(err);
                }
            }
        }
        // if user record exixts then login
        else {
            console.log("Google user exists");
            res.status(200).json({
                error: false,
                message: "Google user exists",
                data: user,
            });
        }
    }
});

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/register/google", async (req, res) => {
    console.log(req.body);
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong Email or Password");

        const bytes = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong Email or Password");

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );

        //Install refreshToken later for more security

        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Verify Email and Email OTP
router.post("/email", async (req, res) => {
    // data
    const data = req.body;
    // create a temporary user
    const tempUser = new TempUser({
        username: data.username,
        email: data.username,
        password: CryptoJS.AES.encrypt(
            data.password,
            process.env.SECRET_KEY
        ).toString(),
        tempPassword: helper.createRandomString(20),
        usageConsentChecked: data.userConsentCheck,
    });

    try {
        const newTempUser = await tempUser.save();
        console.log(newTempUser);
        // create a temporary verification link
        const accessToken = jwt.sign(
            {
                id: newTempUser._id,
                email: newTempUser.email,
                password: newTempUser.tempPassword,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "2m",
            }
        );

        // Save the access token in the database
        try {
            await TempUser.findOneAndUpdate(
                { _id: newTempUser._id },
                { accessToken: accessToken }
            );
            const updatedData = await TempUser.findOne({
                _id: newTempUser._id,
            });
            console.log("Updated Data: ");
            console.log(updatedData);

            const userEmailInput = data.email;
            const backendURI = process.env.BACKEND_URL;
            if (helper.isEmailValid(userEmailInput)) {
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_SMTP,
                    port: process.env.EMAIL_PORT,
                    secure: true, // Use `true` for port 465, `false` for all other ports
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                // async..await is not allowed in global scope, must use a wrapper
                async function main() {
                    // send mail with defined transport object
                    const info = await transporter.sendMail({
                        from:
                            process.env.EMAIL_NAME /* Sender Name */ +
                            " " +
                            process.env
                                .EMAIL_ADDRESS /* Sender Email Address */,
                        to: userEmailInput, // list of receivers e.g. "bar@example.com, baz@example.com"
                        subject: "Email Verification", // Subject line
                        text: "Verify your E-mail Address", // plain text body
                        html: RenderVerificationEmail(
                            updatedData.username,
                            backendURI,
                            updatedData.accessToken
                        ), // html body
                    });

                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

                    res.status(200).json(info);
                }

                main().catch(console.error);
            } else {
                res.status(400).json("Invalid email.");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
