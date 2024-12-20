// Begin
import {importAll} from './js/import-data';
import './css/header.css';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * A react component that renders the website header
 * @returns {ReactNode}
 */
export default function Header (props) {
    // Environment Variables
    const APP_NAME = process.env.REACT_APP_NAME;

    // States
    const [createDropButtonRedirectUrl, setCreateDropButtonRedirectUrl] = useState("/drop/create");

    /**
     * A state variable to store the current type of the Header component
     * Values: logout, signingIn, loggingIn, login
     */
    const [type, setType] = useState();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setType(props.type);
        setUserData(props.userData);
    }, [props.type]);

    const svgs= importAll(require.context('../assets/svgs/', false, /\.(png|jpe?g|svg)$/));

    if (type === 'loggingin') {
        return (
            <div className="header-container">

                {/* Left Hand Side */}
                <img src={ svgs['app-logo.svg'] } alt="App Logo" className="header-inline" id="app-logo-img" />
                <span className="header-inline" id="app-logo-text">{APP_NAME}</span>
                
                {/* Center */}

                {/* Right Hand Side */}
                
            </div>
        );
    } else if (type === 'login') {
        return (
            <div className="header-container login-header">

                {/* Left Hand Side */}
                <img src={ svgs['app-logo.svg'] } alt="App Logo" className="header-inline" id="app-logo-img" />
                <span className="header-inline" id="app-logo-text">{APP_NAME}</span>
                
                {/* Center */}
                <form action="" className="header-inline" id="header-searchbar-form">
                    <input type="text" placeholder="Search Product, Category, genre, etc.." id="header-searchbar-input" />
                </form>

                {/* Right Hand Side */}
                <Link to="" className="header-inline login" id="header-create-drop-button">Drop Product</Link>
                <img src={ svgs['notification-icon-active.svg'] } alt="active notification icon" className="header-inline" id="header-notification-button" />
                <img 
                    src={ 
                        userData !== undefined && 'profilepic' in userData 
                        ? userData.profilepic 
                        : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
                    } 
                    alt="user profile picture" 
                    className="header-inline" 
                    id="header-user-profile-pic" 
                />
                
            </div>
        );
    } else {
        return (
            <div className="header-container">

                {/* Left Hand Side */}
                <img src={ svgs['app-logo.svg'] } alt="App Logo" className="header-inline" id="app-logo-img" />
                <span className="header-inline" id="app-logo-text">{APP_NAME}</span>
                
                {/* Center */}

                {/* Right Hand Side */}
                <div className="right-hand-side">
                    <Link to="" className="" id="header-login-link">Login</Link>
                    <Link to={"/browse/drops"} className="" id="header-promote-drop-button">Become a partner</Link>
                    <Link to={"/login"} state={{ loginRedirectUrl: createDropButtonRedirectUrl }} className="" id="header-create-drop-button">Drop Product</Link>
                </div>
                
            </div>
        );
    }
}