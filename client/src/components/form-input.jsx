import "./css/form-input.css";
import { importAll } from "../components/js/import-data.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useUser } from "../contexts/UserContext";
import axios from "axios";

export default function FormInput(props) {
    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    const [componentType, setComponentType] = useState("");
    const [componentValue, setComponentValue] = useState("");
    const [componentIdPrefix, setComponentIdPrefix] = useState("");
    const [componentRef, setComponentRef] = useState();
    const [showPassword, setShowPassword] = useState();
    const [googleUserData, setGoogleUserData] = useState(null);
    const [loginUserData, setLoginUserData] = useState(null);

    const navigate = useNavigate();

    // Contexts
    const { setUser } = useUser();

    useEffect(() => {
        if (!!props.componentType === true)
            setComponentType(props.componentType);
        if (!!props.componentValue === true)
            setComponentValue(props.componentValue);
        if (!!props.componentIdPrefix === true)
            setComponentIdPrefix(props.componentIdPrefix + "-");
        if (!!props.componentRef === true) setComponentRef(props.componentRef);
    }, [
        props.componentType,
        props.componentValue,
        props.componentIdPrefix,
        props.componentRef,
    ]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (!!componentRef === true && componentType === "password") {
            showPassword
                ? (componentRef.current.type = "text")
                : (componentRef.current.type = "password");
        }
    }, [showPassword, componentRef, componentType]);

    // Effects
    useEffect(() => {
        if (googleUserData) {
            const continueWithGoogle = async () => {
                try {
                    let googleUser = await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`,
                        {
                            googleUserData: googleUserData,
                        }
                    );
                    setLoginUserData(googleUser.data.data);
                } catch (err) {
                    console.log(err);
                }
            };
            continueWithGoogle();
        }
    }, [googleUserData]);

    useEffect(() => {
        if (loginUserData) {
            setUser(loginUserData);
            !loginUserData.isWelcomed
                ? navigate("/welcome")
                : navigate("/browse/drops");
        }
    }, [loginUserData, navigate, setUser]);

    const handleGoogleBtn = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );
            setGoogleUserData(userInfo.data);
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    // Renders
    if (componentType === "username") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-username"}
                    className="input-label"
                >
                    User Name
                </label>
                <div className="form-input-wrap input-username-wrap">
                    <span>linkyo.io</span>
                    <input
                        type="text"
                        id={componentIdPrefix + "input-username"}
                        className="input-username"
                        placeholder="john_doe"
                        value={componentValue}
                        onChange={(e) => setComponentValue(e.target.value)}
                        ref={componentRef}
                    />
                </div>
            </div>
        );
    }

    if (componentType === "fullName") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-full-name"}
                    className="input-label"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    id={componentIdPrefix + "input-full-name"}
                    className="form-input-wrap input-email"
                    placeholder="John Doe"
                    value={componentValue}
                    onChange={(e) => setComponentValue(e.target.value)}
                    ref={componentRef}
                />
            </div>
        );
    }

    if (componentType === "email") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-email"}
                    className="input-label"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    id={componentIdPrefix + "input-email"}
                    className="form-input-wrap input-email"
                    placeholder="johndoe@email.com"
                    value={componentValue}
                    onChange={(e) => setComponentValue(e.target.value)}
                    ref={componentRef}
                />
            </div>
        );
    }

    if (componentType === "password") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-password"}
                    className="input-label"
                >
                    Password
                </label>
                <div className="form-input-wrap input-password-wrap">
                    <input
                        type="password"
                        id={componentIdPrefix + "input-password"}
                        className="input-password"
                        value={componentValue}
                        onChange={(e) => setComponentValue(e.target.value)}
                        ref={componentRef}
                    />
                    <div>
                        {showPassword ? (
                            <img
                                src={svgs["eye-close.svg"]}
                                alt=""
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    cursor: "pointer",
                                }}
                                onClick={handleShowPassword}
                            />
                        ) : (
                            <img
                                src={svgs["eye.svg"]}
                                alt=""
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    cursor: "pointer",
                                }}
                                onClick={handleShowPassword}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (componentType === "usage-consent-check") {
        return (
            // <label htmlFor={componentIdPrefix + 'input-usage-consent'} className="input-usage-consent-container">
            //     <input type="checkbox" id={componentIdPrefix + 'input-usage-consent'} className="input-usage-consent-checkbox" />
            //     <span className="input-usage-consent-checkbox">
            //         <img src={svgs["check.svg"]} alt="" />
            //     </span>
            //     I agree to the privacy policy & cookie usage.
            // </label>

            <div className="checkbox-wrapper-4">
                <input
                    className="inp-cbx"
                    id={componentIdPrefix + "usage-consent-check"}
                    type="checkbox"
                    value={componentValue}
                    onChange={(e) => setComponentValue(e.target.value)}
                    ref={componentRef}
                />
                <label
                    className="cbx"
                    htmlFor={componentIdPrefix + "usage-consent-check"}
                >
                    <span>
                        <svg width="12px" height="10px">
                            <use href="#check-4"></use>
                        </svg>
                    </span>
                    <span>I agree to the privacy policy and cookie usage</span>
                </label>
                <svg className="inline-svg">
                    <symbol id="check-4" viewbox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </symbol>
                </svg>
            </div>
        );
    }

    if (componentType === "google") {
        return (
            <button className="signup-google-link" onClick={handleGoogleBtn}>
                <img
                    src={svgs["icon-google.svg"]}
                    alt="Google Icon"
                    className="signup-google-icon"
                />
                Continue up with Google
            </button>
        );
    }
}
