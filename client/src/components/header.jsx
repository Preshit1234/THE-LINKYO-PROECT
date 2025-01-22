// Begin
import { importAll } from "./js/import-data";
import "./css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * A react component that renders the website header
 * Props:
 * - type: The type of header to render.
 *  - ""
 *  - "loggingin" Set this in login and signup page
 *  - "login"
 * - userData: Login user data.
 * @returns {ReactNode}
 */
export default function Header(props) {
    // Environment Variables
    const APP_NAME = process.env.REACT_APP_NAME;

    // States
    // const [createDropButtonRedirectUrl, setCreateDropButtonRedirectUrl] =
    //     useState("/drop/create");

    /**
     * A state variable to store the current type of the Header component
     * Values: logout, signingIn, loggingIn, login
     */
    const [type, setType] = useState();
    const [userData, setUserData] = useState({});
    const [profilePic, setProfilePic] = useState(
        "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
    );
    const navigate = useNavigate();

    useEffect(() => {
        setType(props.type);
        setUserData(props.userData);
        if (!!props.userData && !!props.userData.profilepic)
            setProfilePic(
                process.env.REACT_APP_BACKEND_URL +
                    "/" +
                    props.userData.profilepic
            );
    }, [props.type, props.userData]);

    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate("/");
    };

    if (type === "loggingin") {
        return (
            <div className="header-container">
                {/* Left Hand Side */}
                <img
                    src={svgs["app-logo.svg"]}
                    alt="App Logo"
                    className="header-inline"
                    id="app-logo-img"
                    onClick={handleLogoClick}
                />
                <span
                    className="header-inline"
                    id="app-logo-text"
                    onClick={handleLogoClick}
                >
                    {APP_NAME}
                </span>

                {/* Center */}

                {/* Right Hand Side */}
            </div>
        );
    } else if (type === "login" && !!userData) {
        return (
            <div className="header-container login-header">
                {/* Left Hand Side */}
                <img
                    src={svgs["app-logo.svg"]}
                    alt="App Logo"
                    className="header-inline"
                    id="app-logo-img"
                    onClick={handleLogoClick}
                />
                <span
                    className="header-inline"
                    id="app-logo-text"
                    onClick={handleLogoClick}
                >
                    {APP_NAME}
                </span>

                {/* Center */}
                <form
                    action=""
                    className="header-inline"
                    id="header-searchbar-form"
                >
                    <input
                        type="text"
                        placeholder="Search Product, Category, genre, etc.."
                        id="header-searchbar-input"
                    />
                </form>

                {/* Right Hand Side */}
                <Link
                    to="/signup/dropper"
                    className="header-inline login"
                    id="header-create-drop-button"
                >
                    Drop Product
                </Link>
                <img
                    src={svgs["notification-icon-active.svg"]}
                    alt="active notification icon"
                    className="header-inline"
                    id="header-notification-button"
                />
                <img
                    src={profilePic}
                    alt="user profile pic"
                    className="header-inline"
                    id="header-user-profile-pic"
                    crossOrigin="use-credentials"
                />
            </div>
        );
    } else {
        return (
            <div className="header-container">
                {/* Left Hand Side */}
                <img
                    src={svgs["app-logo.svg"]}
                    alt="App Logo"
                    className="header-inline"
                    id="app-logo-img"
                    onClick={handleLogoClick}
                />
                <span
                    className="header-inline"
                    id="app-logo-text"
                    onClick={handleLogoClick}
                >
                    {APP_NAME}
                </span>

                {/* Center */}

                {/* Right Hand Side */}
                <div className="right-hand-side">
                    <Link to="/signinpage" className="" id="header-login-link">
                        Login
                    </Link>
                    <Link
                        to={"/browse/drops"}
                        className=""
                        id="header-promote-drop-button"
                    >
                        Become a partner
                    </Link>
                    <Link
                        to={"/signinpage"}
                        className=""
                        id="header-create-drop-button"
                    >
                        Drop Product
                    </Link>
                </div>
            </div>
        );
    }
}
