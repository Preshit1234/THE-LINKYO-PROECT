
const router = require("express").Router();
const User = require("../models/User/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const helper = require("../helper");
const passport = require("passport");

// Functions


// Routers
//REMEMBER, POST = Creating, PUT = Updating, GET = Fetching

// Testing mock data and its response from mongo db
router.post("/register/test", async (req, res) => {
            
    console.log(req.body);

    let record = await User.findOne({email: req.body.email}).exec();

    console.log(record);

    record ? console.log("Record exists") : console.log("Record does not exists");

    res.status(200).json(record);
});

router.post("/google", async (req, res) => {
    const googleUserData = req.body.googleUserData;

    if(!googleUserData) {
        res.status(403).json({
            error: true,
            message: "Data not found",
        });
    } else {
        // get the user that exists in the database
        let user = await User.findOne({googleSubId: googleUserData.sub});
        console.log(user);

        // if user record does not exixts then create new user and redirect to profile creation page
        if(!user) {
            const newUser = new User({
                googleSubId: googleUserData.sub,
                firstName: googleUserData.given_name,
                lastName: googleUserData.family_name,
                email: googleUserData.email,
                isEmailVerified: googleUserData.email_verified,
                profilepic: googleUserData.picture,
            });
            try{
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
                if(err.keyValue.email) {
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

// successRedirect: process.env.CLIENT_URL
// GOOGLE CALLBACK
// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         successRedirect: process.env.CLIENT_URL,
//         failureRedirect: "/login/failed",
//     })
// );

// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         error: true,
//         message: "Log in failure",
//     });
// });

// router.get("/login/success", (req, res) => {
//     if(req.user) {
//         res.status(200).json({
//             error: false,
//             message: "Successfully logged in",
//             user: req.user,
//         });
//     } else {
//         res.status(403).json({
//             error: true,
//             message: "Not authorized",
//         });
//     }
// });

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// REGISTER
router.post("/register", async (req, res) => {
    // const newUser = new User({
    //     username : req.body.username,
    //     email : req.body.email,
    //     password : CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    // })

    // try{
    //     const user = await newUser.save();
    //     res.status(201).json(user);
    // }catch(err){
    //     res.status(500).json(err);
    // } 

    switch (req.body.registrationType) {

        case 'google':
            // Data obtained from Google OAuth2 API
            let userData = req.body.userData;

            // Check if the User is registered or not
            let userExists = await User.findOne({ email: userData.email }).exec();

            if(userExists == null) {
                // Create a User Model with Google API data
                let newUser = new User({
                    email: userData.email,
                    isEmailVerified: userData.email_verified,
                    firstName: userData.given_name,
                    lastName: userData.family_name,
                    profilepic: userData.picture
                });

                // Upload the User data into our database
                try{
                    const user = await newUser.save();
                    res.status(201).json(user);
                }catch(err){
                    console.log(err);
                    res.status(500).json(err);
                }
            } else {
                res.status(409).json({ message: "User already exists. Please log in.", data: userExists });
            }
            break;

        case 'email':

            break;
    }
});

router.get('/register/google', async (req, res) => {
    console.log(req.body);
});

//LOGIN
router.post("/login", async (req, res) => {
    // try{
    //     const user = await User.findOne({ email: req.body.email });
    //     !user && res.status(401).json("Wrong Email or Password");

    //     const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    //     const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    //     originalPassword !== req.body.password && 
    //         res.status(401).json("Wrong Email or Password");

    //         const accessToken = jwt.sign(
    //             {id : user._id, isAdmin : user.isAdmin}, 
    //             process.env.SECRET_KEY,
    //             {expiresIn : "5d"});

    //             //Install refreshToken later for more security

    //     const { password, ...info } = user._doc;
    //     res.status(200).json({...info, accessToken});

    // }catch(err){
    //     res.status(500).json(err); 
    // }

    switch (req.body.loginType) {
        case 'google':
            // Data obtained from Google OAuth2 API
            let userData = req.body.userData;

            // Check if the User is registered or not
            let user = await User.findOne({ email: userData.email }).exec();
            if(user == null) {
                res.status(401).json("User not registered");
            } else {
                res.status(200).json(user);
            }

            break;

        case 'email':
            break;
    }

});


// Verify Email and Email OTP
router.post('/email', async (req, res) => {
    // data
    const userEmailInput = req.body.userEmailInput;
    if(helper.isEmailValid(userEmailInput)) {
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
            from: process.env.EMAIL_NAME /* Sender Name */ + " " + process.env.EMAIL_ADDRESS /* Sender Email Address */,
            to: userEmailInput, // list of receivers e.g. "bar@example.com, baz@example.com"
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

            res.status(200).json(info);
        }
        
        main().catch(console.error);
    } else {
        res.status(400).json("Invalid email.");
    }
});

module.exports = router;