import "./css/signup-page.css";
import { importAll } from "../components/js/import-data.js";
// import Header from "../components/header";
import FormInput from "../components/form-input.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function SignupPage() {
    const [username, setUsername] = useState();

    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    const location = useLocation();
    const navigate = useNavigate();

    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const usageConsentCheckRef = useRef();

    useEffect(() => {
        if (!!location.state === true) {
            !!location.state.usernameInputValue
                ? setUsername(location.state.usernameInputValue)
                : navigate("/");
        } else {
            navigate("/");
        }
    }, [location.state, navigate]);

    const handleContinueButton = async (e) => {
        e.preventDefault();
        // send form data for email confirmation
        try {
            let data = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/auth/email`,
                {
                    username: usernameInputRef.current.value,
                    email: emailInputRef.current.value,
                    password: passwordInputRef.current.value,
                    usageConsentCheck: usageConsentCheckRef.current.checked,
                }
            );
            navigate("/confirmemail", {
                state: {
                    email: emailInputRef.current.value,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* <Header type="loggingin" /> */}
            <div className="signup-page-container">
                <div className="signup-page-col-1">
                    <form action="" className="signup-page-form">
                        <div className="signup-page-form-header">
                            <p className="signup-page-form-title">
                                Create your Linkyo.io Account
                            </p>
                            <p className="signup-page-form-description">
                                Free for partners. Businesses may opt for <br />
                                different plans according to requirement
                            </p>
                        </div>
                        <div className="signup-page-form-body">
                            <div className="signup-page-form-group-1">
                                <FormInput
                                    componentType="username"
                                    componentIdPrefix="signup-page-form"
                                    componentValue={username}
                                    componentRef={usernameInputRef}
                                />
                                <FormInput
                                    componentType="email"
                                    componentIdPrefix="signup-page-form"
                                    componentRef={emailInputRef}
                                />
                                <FormInput
                                    componentType="password"
                                    componentIdPrefix="signup-page-form"
                                    componentRef={passwordInputRef}
                                />
                            </div>
                            <div className="signup-page-form-group-2">
                                <ul>
                                    <li>
                                        Mix of Uppercase & Lowercase letters
                                    </li>
                                    <li>Minimum 8 characters long</li>
                                    <li>Contain atleast 1 number</li>
                                </ul>
                                <FormInput
                                    componentType="usage-consent-check"
                                    componentIdPrefix="signup-page-form"
                                    componentRef={usageConsentCheckRef}
                                />
                            </div>
                            <div className="signup-page-form-group-3">
                                {/* Continue Button */}
                                <button
                                    className="continue-button"
                                    onClick={handleContinueButton}
                                >
                                    Continue
                                </button>

                                <div className="signup-page-form-group-3-seperator">
                                    {/* seperator */}
                                    <div></div>
                                    <span>Or</span>
                                    <div></div>
                                </div>

                                {/* Google Login Button */}
                                <button className="google-login-button">
                                    <img src={svgs["google-icon.svg"]} alt="" />
                                    Express Login with Google
                                </button>
                            </div>
                        </div>
                        <div className="signup-page-form-footer">
                            <p>
                                Already have an account?{" "}
                                <Link
                                    to={""}
                                    className={
                                        "signup-page-form-footer-link sign-in-link"
                                    }
                                >
                                    Sign In
                                </Link>{" "}
                            </p>
                            <p>
                                By Continuing You are agree to Linkyo's{" "}
                                <Link
                                    to={""}
                                    className={"signup-page-form-footer-link"}
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    to={""}
                                    className={"signup-page-form-footer-link"}
                                >
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="signup-page-col-2">
                    <p className="signup-page-app-logo">Linkyo</p>
                    <p className="signup-page-app-logo-text">
                        A next-gen Partner marketing platform powered by{" "}
                        <span>AI.</span>
                    </p>
                </div>
            </div>
        </>
    );
}
