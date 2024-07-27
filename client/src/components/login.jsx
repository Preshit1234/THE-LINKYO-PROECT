import gsap from 'gsap';
import './css/login.css';
import axios from 'axios';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';
import { importAll } from './js/import-data';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { isObjectEmpty, isStringEmpty, isDataFromOurDatabase, isEmailValid } from '../helper';

/**
 * An UI component which handles user login process.
 * @returns {ReactNode}
 */
const Login = () => {
    /* Login stages:
        Stage 1: Initialize - User selects their login method. 
            1. Login via Google.
            2. Login via Email.
        Stage 2: Verify - User inputted email address is validated and login code is sent.
            Failure Conditions:
            1. Invalid Email - then alert to input valid email
            2. Fail to send email OTP
            3. OTP does not match.
        Stage 3: Login - User info is sent to backend for login along with their login method.
            Failure Conditions:
            1. Google user does not exists - then register.
            2. Email does not exist - then alert wrong email and proceed to register.
            3. Wrong login code - unauthorized access attempt.
        Stage 3: Redirect - User is redirected to /create/drop page.
    */

    const [loginStage, setLoginStage] = useState("initialize"); // Values: initialize | login | redirect
    const [loginMethod, setLoginMethod] = useState(); // Values: google | email
    const [emailLoginStage, setEmailLoginStage] = useState(); // Values : checkEmail | initOTP | checkOTP | login
    const [userEmailInput, setUserEmailInput] = useState("");
    const [emailOTP, setEmailOTP] = useState();

    const [errorMessage, setErrorMessage] = useState(""); // Current error message
    const [errorStatus, setErrorStatus] = useState(200); // Current error status code
    const [userData, setUserData] = useState({}); // Linkyo User data

    const navigate = useNavigate();
    const svgs = importAll(require.context('../assets/svgs/', false, /.(png|jpe?g|svg)$/));

    // For gsap
    gsap.registerPlugin(useGSAP);
    const loginForm = useRef();
    const { contextSafe } = useGSAP({ scope: loginForm });
    contextSafe(() => {
        gsap.set("#login-form-input-email", {x: 0, y: 0, alpha: 1});
        gsap.set("#login-form-input-login-code", {x: 0, y: 0, alpha: 0});
    });

    useEffect(() => {

        // Stage 3 - google
        if (loginStage === "login" && loginMethod === "google" && !isObjectEmpty(userData) && errorStatus === 200) {
            loginUser();
        } else 

        // Stage 4 - google
        if (loginStage === "redirect" && loginMethod === "google" && !isObjectEmpty(userData) && errorStatus === 200) {
            handleRedirect();
        }

        // stage 2 - email
        if (loginStage === "authenticate" && loginMethod === "email" && !isStringEmpty(userEmailInput) && errorStatus === 200 && emailLoginStage === "initOTP") {
            authenticateUser();
        }

    }, [loginMethod, loginStage, errorStatus, userData, userEmailInput, emailLoginStage]);

    // Stage 1

    // Method: Google
    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setLoginMethod('google');
            // Get google user data
            axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { 
                    headers: { 
                        Authorization: 'Bearer ' + tokenResponse.access_token 
                    } 
                }
            )
            .then( (res) => {
                setUserData(res.data);
                setLoginStage('login');
            })
            .catch( (err) => {
                console.log("Error while obtaining Google User info");
                console.log(err);
            });
        },
        onError: errorResponse => console.log(errorResponse),
    });

    // Method: Email
    const emailLogin = () => {
        setEmailLoginStage("initEmail");
        setLoginMethod("email");
        setEmailLoginStage("checkEmail");
        validateEmail(); // Set email login stage: initOTP
    };

    // Stage 2
    const authenticateUser = () => {
        // initOTP stage
        changeInputOption();
        sendEmailOTP();
        // setEmailLoginStage("checkOTP");
        // getOtpInput();
        // validateOtpInput();
        // if OTP validated
        // setLoginStage('login');
    }

    // Stage 3
    const loginUser = () => {
        requestUserLogin();
        setLoginStage('redirect');
    };

    // Stage 4
    const handleRedirect = () => {
        if(errorStatus === 401) {
            requestUserRegistration();
        } else {
            switch (loginMethod) {
                case "google":
                    isDataFromOurDatabase(userData) &&
                    navigate('/browse/drops', { state : {
                        loginType: loginMethod,
                        userData: userData,
                    }});
                    break;

                case "email":
                    isDataFromOurDatabase(userData) &&
                    navigate('/login', { state : {
                        loginType: loginMethod,
                        userData: userData,
                    }});
                    break;

                default:
                    break;
            }
        }
    };

    // Login with google 
    const requestUserLogin = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/login', { 
            loginType: loginMethod,
            userData: userData,
        })
        .then((response) => {
            setUserData(response.data); // Linkyo user data
            setErrorStatus(200);
            setErrorMessage("");
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                // Wrong email.
                setErrorMessage("Wrong email. Please restart.");
                setErrorStatus(401);
            } else { // Unexpected error
                setErrorMessage('An error occurred. Please try again.');
            }
        });
    }

    // Register the user in the backend
    const requestUserRegistration = () => {
        axios.post( 
            process.env.REACT_APP_BACKEND_URL + '/api/auth/register', 
            { 
                registrationType: loginMethod,
                userData: userData
            }
        )
        .then((response) => {
            setUserData(response.data); // Linkyo user data
            setErrorMessage("User Registered");
            setErrorStatus(200);
        })
        .catch((error) => {
            if (error.response && error.response.status === 409) { // User already exists
                setErrorMessage(error.response.data.message);
                setErrorStatus(409);
            } else { // Unexpected error
                setErrorMessage('An error occurred. Please try again.');
            };
        });
    };

    const validateEmail = () => {
        if ( isEmailValid(userEmailInput) ) {
            setErrorStatus(200); 
            setErrorMessage("");
            setEmailLoginStage("initOTP"); 
            setLoginStage("authenticate");
        } else {
            setErrorStatus(400); setErrorMessage("Invalid email.");
        }
    }

    const setEmail = () => {
        let email = document.getElementById("login-form-input-email").value;
        setUserEmailInput(email === undefined ? "" : email);
    } 

    // Animate login input 
    const changeInputOption = contextSafe(() => {
        gsap.fromTo("#login-form-input-email", {y: 0, alpha: 1}, {y: -100, alpha: 0});
        gsap.fromTo("#login-form-input-login-code", {y: 100, alpha: 0}, {y: 0, alpha: 1}); 
    });

    // Request backend to generate and send an OTP on the provided email
    const sendEmailOTP = async () => {
        await axios.post(
            process.env.REACT_APP_BACKEND_URL + '/api/auth/email',
            {
                userEmailInput: userEmailInput
            }
        ).then((response) => {
            console.log(response);
        });
    }

    return (
        <div id="login-container">
            <form action="#" method="" className="login-form" ref={loginForm}>
                <div id="login-form-input-container">
                    <input type="email" className="login-form-input" id="login-form-input-email" placeholder="Enter Your Email Address" onChange={setEmail} />
                    <input type="number" className="login-form-input" id="login-form-input-login-code" placeholder="Enter Login Code" />
                </div>
                <button type="button" className="login-form-submit-button" onClick={emailLogin} id="login-form-continue-button">
                    Continue
                    {/* <img src={svgs["arrow.svg"]} alt="Arrow" className="login-form-arrow" /> */}
                    <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="login-form-arrow">
                        <path d="M1.57544 1L9.28772 7L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </form>
            <span className="login-partition">
                <hr />
                <span>Or</span>
                <hr />
            </span>
            <div className="login-google-link" onClick={googleLogin}>
                <img src={svgs["icon-google.svg"]} alt="Google Icon" className="login-google-icon" />
                Express Login with Google
            </div>
            <div className="login-error">
                <p> { errorStatus !== 200 && errorStatus !== 401 ? errorMessage : "" } </p>
            </div>
        </div>
    );
}

export default Login;