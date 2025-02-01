import loginstyles from "./css/loginpage.module.css";
// import { importAll } from "../components/js/import-data.js";
import FormInput from "../components/form-input.jsx";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import SEO from "../components/seo.jsx";
import Header from "../components/header.jsx";

export default function LoginPageX() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!!user) {
            if (user.isWelcomed) {
                navigate("/user/home");
            } else {
                navigate("/user/welcome");
            }
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try {
            const login = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
                {
                    email: emailInputRef.current.value,
                    password: passwordInputRef.current.value,
                },
                {
                    withCredentials: "true",
                }
            );
            if (!!login) {
                const userData = {
                    id: login.data._id,
                    username: login.data.username,
                    email: login.data.email,
                    isEmailVerified: login.data.isEmailVerified,
                    googleSubId: login.data.googleSubId,

                    firstName: login.data.firstName,
                    lastName: login.data.lastName,
                    fullName: login.data.fullName,
                    about: login.data.about,

                    profilepic: login.data.profilepic,
                    followers: login.data.followers,
                    followings: login.data.followings,

                    isDropper: login.data.isDropper,
                    belongsToOrgs: login.data.belongsToOrg,

                    isWelcomed: login.data.isWelcomed,
                    createdAt: login.data.createdAt,
                };
                localStorage.setItem("accessToken", login.data.accessToken);
                setUser(userData);
            }
        } catch (err) {
            console.log(err);
            if (err.response.data === "User not found")
                alert("Incorrect email: Please check your email again");
            if (err.response.data === "Wrong Email or Password") {
                alert(
                    "Wrong password. Make sure you are typing the password correctly"
                );
            }
        }
    };

    return (
        <>
            <SEO
                title="Linkyo | Login Page"
                description="Login into your Linkyo.io account"
                name="Linkyo"
                type="website"
            />
            <Header type="loggingin" />
            <div className={loginstyles.loginPageClass}>
                <div className={loginstyles.loginPageContainer}>
                    <div className={loginstyles.titleContainer}>
                        <div className={loginstyles.titleName}>
                            Welcome Back to Linkyo.io
                        </div>
                    </div>
                    <div className={loginstyles.emailPassContainer}>
                        <FormInput
                            componentType="email"
                            componentIdPrefix="loginpage"
                            componentRef={emailInputRef}
                        />
                        <FormInput
                            componentType="password"
                            componentIdPrefix="loginpage"
                            componentRef={passwordInputRef}
                        />
                        <div className={loginstyles.forgotPassLink}>
                            Forgotten your Password?
                        </div>
                    </div>
                    <div className={loginstyles.logInBtnsContainer}>
                        <div className={loginstyles.logInBtn}>
                            <button
                                type="button"
                                className={loginstyles.signInBtn}
                                onClick={handleLogin}
                            >
                                Log in
                            </button>
                        </div>
                        <div className={loginstyles.theOrGroup}>
                            <hr className={loginstyles.HrTag} />
                            <div className={loginstyles.OrTitle}>OR</div>
                            <hr className={loginstyles.HrTag} />
                        </div>
                        <div className={loginstyles.googleLoginBtn}>
                            {/* prithvi is building component for google login button */}
                        </div>
                    </div>
                    <div className={loginstyles.signUpClass}>
                        <div className={loginstyles.signUpTitleClass}>
                            <div className={loginstyles.signUpAcctitle}>
                                Don't have an Account?{" "}
                            </div>
                            <NavLink
                                to="/signup"
                                className={loginstyles.signUpTitle}
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
