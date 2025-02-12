// Begin
import { importAll } from "./js/import-data";
import "./css/header.css";
import styles from "./css/header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { Icon } from "@iconify/react";
import useClickDetector from "./hooks/clickDetector";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

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
const Header = memo(function Header(props) {
    // Environment Variables
    const APP_NAME = process.env.REACT_APP_NAME;

    /**
     * A state variable to store the current type of the Header component
     * Values: logout, signingIn, loggingIn, login
     */
    const [type, setType] = useState();
    const [profilePic, setProfilePic] = useState(
        "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
    );
    const [isProfilePicDialogOpen, setIsProfilePicDialogOpen] = useState(false);
    const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] =
        useState(false);
    const [haveNewNotifications, setHaveNewNotifications] = useState(true);
    const [isSwitchAccountsDialogOpen, setIsSwitchAccountsDialogOpen] =
        useState(false);
    const [member, setMember] = useState();

    const profilePicRef = useRef();
    const notificationsIconRef = useRef();
    const switchAccountsRef = useRef();
    const profilePicDialogRef = useRef();
    const notificationsDialogRef = useRef();
    const switchAccountsDialogRef = useRef();
    const cancelButtonRef = useRef();
    const searchInputRef = useRef();

    const [clickedElement, setClickedElement] = useClickDetector();
    const { user, setUser } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (type === "memberLogin") setMember(props.member);
    }, [props.member, type]);

    // Effect to control modals
    useEffect(() => {
        if (!clickedElement) {
            return;
        }
        // If user clicked on notifications icon or notifications modal
        if (
            !!notificationsIconRef.current &&
            clickedElement === notificationsIconRef.current
        ) {
            setIsNotificationsDialogOpen(!isNotificationsDialogOpen);
            setHaveNewNotifications(false);
        } else if (
            !!notificationsDialogRef.current &&
            notificationsDialogRef.current.contains(clickedElement)
        ) {
            setIsNotificationsDialogOpen(true);
        } else {
            if (isNotificationsDialogOpen) setIsNotificationsDialogOpen(false);
        }

        // If user clicked on profile pic or profile pic modal
        if (
            !!profilePicRef.current &&
            clickedElement === profilePicRef.current
        ) {
            setIsProfilePicDialogOpen(!isProfilePicDialogOpen);
        } else if (
            !!profilePicDialogRef.current &&
            profilePicDialogRef.current.contains(clickedElement)
        ) {
            setIsProfilePicDialogOpen(true);
        } else {
            setIsProfilePicDialogOpen(false);
        }

        // If user clicked on switch accounts or switch accounts modal
        if (
            !!switchAccountsRef.current &&
            clickedElement === switchAccountsRef.current
        ) {
            setIsSwitchAccountsDialogOpen(!isSwitchAccountsDialogOpen);
        } else if (
            !!switchAccountsDialogRef.current &&
            switchAccountsDialogRef.current.contains(clickedElement)
        ) {
            setIsSwitchAccountsDialogOpen(true);
        } else {
            setIsSwitchAccountsDialogOpen(false);
        }

        // Setting clicked element to null to avoid an infinite loop
        setClickedElement(null);
    }, [clickedElement, setClickedElement, isNotificationsDialogOpen, isProfilePicDialogOpen, isSwitchAccountsDialogOpen]);

    useEffect(() => {
        setType(props.type);
        if (!!user && !!user.profilepic) setProfilePic(user.profilepic);
    }, [props.type, user]);

    useEffect(() => {
        if (!!profilePicDialogRef.current)
            !!isProfilePicDialogOpen
                ? profilePicDialogRef.current.show()
                : profilePicDialogRef.current.close();
    }, [isProfilePicDialogOpen]);

    useEffect(() => {
        if (!!notificationsDialogRef.current)
            !!isNotificationsDialogOpen
                ? notificationsDialogRef.current.show()
                : notificationsDialogRef.current.close();
    }, [isNotificationsDialogOpen]);

    useEffect(() => {
        if (!!switchAccountsDialogRef.current) {
            !!isSwitchAccountsDialogOpen
                ? switchAccountsDialogRef.current.show()
                : switchAccountsDialogRef.current.close();
        }
        // When modal functions doesn't work
        if (!!switchAccountsDialogRef.current) {
            !!isSwitchAccountsDialogOpen
                ? (switchAccountsDialogRef.current.style.display = "flex")
                : (switchAccountsDialogRef.current.style.display = "none");
        }
    }, [isSwitchAccountsDialogOpen]);

    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const handleSearchInputCancelButtonClick = (e) => {
        e.preventDefault();
        searchInputRef.current.value = "";
        cancelButtonRef.current.style.display = "none";
    };

    const handleSearchInputMouseEnter = () => {
        if (!!searchInputRef.current.value)
            cancelButtonRef.current.style.display = "flex";
    };

    const handleSearchInputMouseLeave = (e) => {
        if (!searchInputRef.current.value) {
            cancelButtonRef.current.style.display = "none";
        }
    };

    const handleSearchInputFocusEvent = () => {
        cancelButtonRef.current.style.display = "flex";
    };

    const handleOrgListItemClick = async (e) => {
        let orgId = e.target.getAttribute("data-orgid");
        let accessToken = localStorage.getItem("accessToken");
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/dropper/member/login`,
                {
                    orgId: orgId,
                },
                {
                    headers: {
                        token: `Bearer ${accessToken}`,
                    },
                }
            );
            localStorage.setItem("memberAccessToken", res.data.accessToken);
        } catch (err) {
            console.log(err);
        }
        navigate("/dropper/dashboard", { state: { orgId: orgId } });
    };

    const handleBackToMainAccount = async (e) => {
        e.preventDefault();

        localStorage.removeItem("memberAccessToken");
        setMember(null);
        navigate("/user/home");
    };

    const handleSignOutClick = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/");
    };

    if (type === "loggingin") {
        return (
            <div className={styles.container}>
                {/* Left Hand Side */}
                <div className={styles.left}>
                    <img
                        src={svgs["app-logo.svg"]}
                        alt="App Logo"
                        className=""
                        id="app-logo-img"
                        onClick={handleLogoClick}
                    />
                    <span
                        className=""
                        id="app-logo-text"
                        onClick={handleLogoClick}
                    >
                        {APP_NAME}
                    </span>
                </div>

                {/* Center */}

                {/* Right Hand Side */}
                <div></div>
            </div>
        );
    } else if (type === "login" && !!user) {
        return (
            <div className={styles.container + " " + styles.login}>
                {/* Left Hand Side */}
                <div className={styles.left}>
                    <img
                        src={svgs["app-logo.svg"]}
                        alt="App Logo"
                        className={styles.logoImg}
                        id="app-logo-img"
                        onClick={handleLogoClick}
                    />
                    <span
                        className={styles.logoText}
                        id="app-logo-text"
                        onClick={handleLogoClick}
                    >
                        {APP_NAME}
                    </span>
                </div>

                {/* Center */}
                <div className={styles.center}>
                    <form
                        action=""
                        id="header-searchbar-form"
                        className={styles.form}
                    >
                        <div className={styles.inputContainer}>
                            <input
                                type="search"
                                placeholder="Search Product, Category, genre, etc.."
                                id="header-searchbar-input"
                                className={styles.searchInput}
                                ref={searchInputRef}
                                onFocus={handleSearchInputFocusEvent}
                                onMouseEnter={handleSearchInputMouseEnter}
                                onMouseLeave={handleSearchInputMouseLeave}
                            />
                            <button
                                className={styles.searchInputCancelButton}
                                ref={cancelButtonRef}
                                onClick={handleSearchInputCancelButtonClick}
                                onMouseEnter={handleSearchInputMouseEnter}
                                onMouseLeave={handleSearchInputMouseLeave}
                            >
                                <Icon
                                    icon="radix-icons:cross-1"
                                    width="20"
                                    height="20"
                                    style={{ color: "#fff" }}
                                />
                            </button>
                        </div>
                        <button className={styles.searchButton}>
                            <Icon
                                icon="uil:search"
                                width="18"
                                height="18"
                                style={{ color: "#fff" }}
                            />
                        </button>
                    </form>
                </div>

                {/* Right Hand Side */}
                <div className={styles.right}>
                    {!!user.belongsToOrgs.length > 0 ? (
                        <div
                            className={styles.switchAccounts}
                            ref={switchAccountsRef}
                        >
                            Switch Account
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/dropper/signup"
                                className={
                                    styles.dropButton + " " + styles.default
                                }
                                id="header-create-drop-button"
                            >
                                Drop Product
                            </Link>
                            <Link
                                to="/dropper/signup"
                                className={
                                    styles.dropButton + " " + styles.mobile
                                }
                                id="header-create-drop-button"
                            >
                                Drop
                            </Link>
                        </>
                    )}
                    <div
                        style={{ width: "30px", height: "30px" }}
                        className={styles.notificationsIconContainer}
                        ref={notificationsIconRef}
                    >
                        {!haveNewNotifications && !isNotificationsDialogOpen ? (
                            <Icon
                                icon="material-symbols:notifications-outline-rounded"
                                width="30"
                                height="30"
                                style={{ color: "#fff", pointerEvents: "none" }}
                                alt="active notification icon"
                                className={styles.notificationIcon}
                                id="header-notification-button"
                            />
                        ) : isNotificationsDialogOpen ? (
                            <Icon
                                icon="material-symbols:notifications-rounded"
                                width="30"
                                height="30"
                                style={{ color: "#fff", pointerEvents: "none" }}
                                alt="active notification icon"
                                className={styles.notificationIcon}
                                id="header-notification-button"
                            />
                        ) : (
                            <Icon
                                icon="material-symbols:notifications-unread-outline-rounded"
                                width="30"
                                height="30"
                                style={{ color: "#fff", pointerEvents: "none" }}
                                alt="active notification icon"
                                className={styles.notificationIcon}
                                id="header-notification-button"
                            />
                        )}
                    </div>
                    <img
                        src={profilePic}
                        alt="user profile pic"
                        className=""
                        id="header-user-profile-pic"
                        crossOrigin="use-credentials"
                        style={{ cursor: "pointer" }}
                        ref={profilePicRef}
                    />
                </div>
                <dialog
                    className={styles.switchAccountsDialog}
                    ref={switchAccountsDialogRef}
                >
                    <span className={styles.title}>Your Teams:</span>
                    {user.belongsToOrgs.map((org) => (
                        <div
                            className={styles.listItem}
                            key={org._id}
                            data-orgid={org._id}
                            onClick={handleOrgListItemClick}
                        >
                            <span className={styles.listName}>{org.name}</span>
                            <Icon
                                icon="fluent-mdl2:navigate-forward"
                                width="18"
                                height="18"
                                className={styles.listIcon}
                            />
                        </div>
                    ))}
                </dialog>
                <dialog
                    className={styles.notificationsDialog}
                    ref={notificationsDialogRef}
                >
                    <div className={styles.row1}>
                        <span>Notifications</span>
                        <Icon
                            icon="ic:baseline-settings"
                            width="24"
                            height="24"
                            style={{ color: "#b82727" }}
                        />
                    </div>
                    <div className={styles.row2}></div>
                </dialog>
                <dialog
                    ref={profilePicDialogRef}
                    className={styles.profilePicDialog}
                >
                    <div className={styles.row1}>
                        <div className={styles.col1}>
                            <img
                                src={profilePic}
                                alt="user profile pic"
                                className={styles.dialogPic}
                                id=""
                                crossOrigin="use-credentials"
                            />
                        </div>
                        <div className={styles.col2}>
                            <span className={styles.fullName}>
                                {user.fullName}
                            </span>
                            <span className={styles.email}>{user.email}</span>
                        </div>
                    </div>
                    <div className={styles.row2}>
                        <div to="" className={styles.links}>
                            <Icon
                                icon="ic:round-person"
                                width="24"
                                height="24"
                                style={{ color: "#ffffff" }}
                            />
                            Profile
                        </div>
                        <div to="" className={styles.links}>
                            <Icon
                                icon="ic:sharp-switch-account"
                                width="24"
                                height="24"
                                style={{ color: "#ffffff" }}
                            />
                            Switch
                        </div>
                        <div to="" className={styles.links}>
                            <Icon
                                icon="ic:sharp-account-box"
                                width="24"
                                height="24"
                                style={{ color: "#ffffff" }}
                            />
                            Account
                        </div>
                        <div
                            to=""
                            className={styles.links}
                            onClick={handleSignOutClick}
                        >
                            <Icon
                                icon="ic:sharp-exit-to-app"
                                width="24"
                                height="24"
                                style={{ color: "#ffffff" }}
                            />
                            Sign out
                        </div>
                        <div to="" className={styles.links}>
                            <Icon
                                icon="ic:baseline-settings"
                                width="24"
                                height="24"
                                style={{ color: "#ffffff" }}
                            />
                            Settings
                        </div>
                    </div>
                </dialog>
            </div>
        );
    } else if (type === "memberLogin") {
        return (
            <div className={styles.container}>
                {/* Left Hand Side */}
                <div className={styles.left}>
                    <img
                        src={svgs["app-logo.svg"]}
                        alt="App Logo"
                        className=""
                        id="app-logo-img"
                        onClick={handleLogoClick}
                    />
                    <span
                        className=""
                        id="app-logo-text"
                        onClick={handleLogoClick}
                    >
                        {APP_NAME}
                    </span>
                </div>

                {/* Center */}
                <div>
                    <span style={{ fontSize: "25px" }}>
                        {!!member ? member.organization.name : ""}
                    </span>
                </div>

                {/* Right Hand Side */}
                <div className={styles.right}>
                    <Link
                        to="/user/home"
                        className={styles.backToMainAccount}
                        onClick={handleBackToMainAccount}
                    >
                        Back to Main Account
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.container}>
                {/* Left Hand Side */}
                <div className={styles.left}>
                    <img
                        src={svgs["app-logo.svg"]}
                        alt="App Logo"
                        className=""
                        id="app-logo-img"
                        onClick={handleLogoClick}
                    />
                    <span
                        className=""
                        id="app-logo-text"
                        onClick={handleLogoClick}
                    >
                        {APP_NAME}
                    </span>
                </div>

                {/* Center */}

                {/* Right Hand Side */}
                <div className={styles.right}>
                    <Link to="/signin" className="" id="header-login-link">
                        Login
                    </Link>
                    <Link
                        to={"user/home"}
                        className=""
                        id="header-promote-drop-button"
                    >
                        Become a partner
                    </Link>
                    <Link
                        to={"/signin"}
                        className={styles.dropButton}
                        id="header-create-drop-button"
                    >
                        Drop Product
                    </Link>
                </div>
            </div>
        );
    }
});

export default Header;
