import "./css/form-input.css";
import { importAll } from "../components/js/import-data.js";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { countries } from "../helper.js";
import { Icon } from "@iconify/react";
import isMobilePhone from "validator/lib/isMobilePhone";

export default function FormInput(props) {
    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    const [componentType, setComponentType] = useState("");
    const [componentValue, setComponentValue] = useState("");
    const [componentIdPrefix, setComponentIdPrefix] = useState("");
    const [componentRef, setComponentRef] = useState();
    // const [isValueValid, setIsValueValid] = useState(false);

    // Component Type "password" states
    const [showPassword, setShowPassword] = useState();

    // Component Type "google" states
    const [googleUserData, setGoogleUserData] = useState(null);
    const [loginUserData, setLoginUserData] = useState(null);

    // Component Type "contact" states
    const [isCountrySelectionOpen, setIsCountrySelectionOpen] = useState(false);
    const [countryFlagCode, setCountryFlagCode] = useState("in");
    const [countryPhoneCode, setCountryPhoneCode] = useState("+91");
    const [isContactValidated, setIsContactValidated] = useState(false);
    const [completeContactNumber, setCompleteContactNumber] = useState("");

    const countrySelectionOptionsRef = useRef();

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
                    Username
                </label>
                <div className="form-input-wrap input-username-wrap">
                    <span>linkyo.io</span>
                    <input
                        type="text"
                        id={componentIdPrefix + "input-username"}
                        className="input-username"
                        placeholder="..."
                        value={componentValue}
                        onChange={(e) => setComponentValue(e.target.value)}
                        ref={componentRef}
                    />
                </div>
            </div>
        );
    }

    if (componentType === "name") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-name"}
                    className="input-label"
                >
                    Name
                </label>
                <input
                    type="text"
                    id={componentIdPrefix + "input-name"}
                    className="form-input-wrap input-name"
                    placeholder="..."
                    value={componentValue}
                    onChange={(e) => setComponentValue(e.target.value)}
                    ref={componentRef}
                />
            </div>
        );
    }

    if (componentType === "fullName") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-fullName"}
                    className="input-label"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    id={componentIdPrefix + "input-fullName"}
                    className="form-input-wrap input-fullName"
                    placeholder="..."
                    value={componentValue}
                    onChange={(e) => setComponentValue(e.target.value)}
                    ref={componentRef}
                />
            </div>
        );
    }

    if (componentType === "address") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-address"}
                    className="input-label"
                >
                    Address
                </label>
                <textarea
                    id={componentIdPrefix + "input-address"}
                    className="form-input-wrap input-address"
                    placeholder="..."
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
                    Email
                </label>
                <input
                    type="email"
                    id={componentIdPrefix + "input-email"}
                    className="form-input-wrap input-email"
                    placeholder="user@example.com"
                    value={componentValue}
                    onChange={(e) => setComponentValue(e.target.value)}
                    ref={componentRef}
                />
            </div>
        );
    }

    const handlePasswordChange = (e) => {
        // const inputValue = e.target.value;
        // const textCasesCheck = /(?=.*[a-z])(?=.*[A-Z])/.test(inputValue);
        // const numberCheck = /(?=.*[0-9])/.test(inputValue);
        // const lengthCheck = inputValue.length >= 8 ? true : false;
        // console.log("------------Test------------");
        // console.log(
        //     "Test: Password includes mix of both capital letter and small letter: ",
        //     textCasesCheck
        // );
        // console.log(
        //     "Test: Password includes at least one number: ",
        //     numberCheck
        // );
        // console.log(
        //     "Test: Password is minimum 8 characters long: ",
        //     lengthCheck
        // );
        // console.log("------------Test------------");
        // console.log("");
        // if (textCasesCheck && numberCheck && lengthCheck) {
        //     setIsValueValid(true);
        // } else {
        //     setIsValueValid(false);
        // }
        setComponentValue(e.target.value);
    };
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
                        placeholder="eXmp1P@s5w04d*"
                        value={componentValue}
                        onChange={handlePasswordChange}
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
                                    flexShrink: "0",
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

    const handleCountrySelectionDisplay = () => {
        setIsCountrySelectionOpen(!isCountrySelectionOpen);
    };

    const handleCountrySelectionOptions = (e) => {
        setCountryFlagCode(e.currentTarget.dataset.countrycode.toLowerCase());
        setCountryPhoneCode("+" + e.currentTarget.dataset.countryphone);
        setIsCountrySelectionOpen(false);
        setComponentValue({});
        setIsContactValidated(false);
    };

    const handleContactInputChange = (e) => {
        const completeContactNumber = countryPhoneCode + e.target.value;
        // const isMobilePhone = isMobilePhone();
        // console.log(isMobilePhone(completeContactNumber));
        setIsContactValidated(isMobilePhone(completeContactNumber));
        setComponentValue({
            contactCountryPhoneCode: countryPhoneCode,
            contactPhoneNumber: e.target.value,
            completeContactNumber: completeContactNumber,
        });
        setCompleteContactNumber(completeContactNumber);
    };

    if (componentType === "contact") {
        return (
            <div className="form-input-container">
                <label
                    htmlFor={componentIdPrefix + "input-contact"}
                    className="input-label"
                >
                    Contact
                </label>
                <div
                    className="form-input-wrap input-contact-wrap"
                    style={{
                        borderColor: isContactValidated ? "#0F9D58" : "#606060",
                    }}
                >
                    <div
                        className="input-contact-country-selection-display"
                        onClick={handleCountrySelectionDisplay}
                        style={{
                            borderColor: isContactValidated
                                ? "#0F9D58"
                                : "#606060",
                        }}
                    >
                        <Icon icon={"flag:" + countryFlagCode + "-4x3"} />
                        <strong>{countryPhoneCode}</strong>
                        <Icon
                            icon="icon-park-solid:down-one"
                            width="16"
                            height="16"
                        />
                    </div>
                    <input
                        type="tel"
                        id={componentIdPrefix + "input-contact"}
                        className="input-contact"
                        onChange={handleContactInputChange}
                    />
                    <input
                        type="hidden"
                        value={completeContactNumber}
                        ref={componentRef}
                    />
                    <div
                        className="input-contact-country-selection-options-wrap"
                        ref={countrySelectionOptionsRef}
                        style={{
                            display: isCountrySelectionOpen ? "block" : "none",
                        }}
                    >
                        {countries.map((country) => (
                            <div
                                className="input-contact-country-selection-options"
                                data-countryname={country.name}
                                data-countrycode={country.code}
                                data-countryphone={country.phone}
                                onClick={handleCountrySelectionOptions}
                                key={countries.indexOf(country)}
                            >
                                <Icon
                                    icon={`flag:${country.code.toLowerCase()}-4x3`}
                                />
                                <span className="input-contact-country-selection-options-country-name">
                                    {country.name}
                                </span>
                                <span>{`+${country.phone}`}</span>
                            </div>
                        ))}
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
            <button
                className="signup-google-link"
                style={props.style}
                onClick={handleGoogleBtn}
            >
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
