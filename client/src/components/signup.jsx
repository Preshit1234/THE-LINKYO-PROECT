import './css/signup.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { importAll } from './js/import-data';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { isObjectEmpty, isStringEmpty, isDataFromOurDatabase } from '../helper';

/**
 * Signup Component.
 * Includes sign in with google optiom OR Sign in with email option
 * @returns {ReactNode} A react element for Signup process
 */
export default function Signup() {
    /* Signup stages:
        Stage 1: Initialize - User selects their signup method. 
            1. Signup via Google.
            2. Signup via Email.
        Stage 2: Register - User info is sent to backend for registration along with their signup method.
            Failure Conditions:
            1. User already exists - Auto Google login or redirected to login page.
        Stage 3: Redirect - User is redirected to /browse/drops page.
    */

    const [signupMethod, setSignupMethod] = useState(); // Values: google | email
    const [signupStage, setSignupStage] = useState("initialize"); // Values: initialize | register | redirect

    const [errorMessage, setErrorMessage] = useState(""); // Current error message
    const [errorStatus, setErrorStatus] = useState(200); // Current error status code
    const [userData, setUserData] = useState({}); // Linkyo User data
    
    const navigate = useNavigate();
    const svgs = importAll(require.context('../assets/svgs/', false, /.(png|jpe?g|svg)$/));

    useEffect(() => {

        // Stage 2
        if (signupStage === "register" && !isStringEmpty(signupMethod) && !isObjectEmpty(userData)) {
            registerUser();
        } else 

        // Stage 3
        if (signupStage === "redirect" && !isStringEmpty(signupMethod) && !isObjectEmpty(userData)) {
            handleRedirect();
        }

    }, [signupMethod, signupStage, errorStatus, userData]);

    
    // Stage 1

    // Method: Google
    const googleSignup = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setSignupMethod('google');
            // Get google user data
            axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { 
                    headers: { 
                        Authorization: 'Bearer ' + tokenResponse.access_token,
                        'Cross-Origin-Opener-Policy': 'unsafe-none',
                        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
                        'Cross-Origin-Opener-Policy': 'same-origin'
                    } 
                }
            )
            .then( (res) => {
                setUserData(res.data);
                setSignupStage('register');
            })
            .catch( (err) => {
                console.log("Error while obtaining Google User info");
                console.log(err);
            });
        },
        onError: errorResponse => console.log(errorResponse),
    });

    // Method: Email
    const emailSignup = () => {
        setSignupMethod('email');
        setUserData(getEmailUserData());
        setSignupStage('register');
        setErrorStatus(200);
        setErrorMessage("");
    };

    // Stage 2
    const registerUser = async () => {
        await requestUserRegistration();
        setSignupStage('redirect');
    };

    // Stage 3
    const handleRedirect = () => {
        if(errorStatus === 409) {
            requestUserLogin();
        } else if (errorStatus === 200) {
            switch (signupMethod) {
                case "google":
                    isDataFromOurDatabase(userData) && 
                    navigate('/browse/drops', { state : {
                        loginType: signupMethod,
                        userData: userData,
                    }});
                    break;

                case "email":
                    isDataFromOurDatabase(userData) &&
                    navigate('/login', { state : {
                        loginType: signupMethod,
                        userData: userData,
                    }});
                    break;

                default:
                    break;
            }
        }
    };


    // Register the user in the backend
    const requestUserRegistration = async () => {
        await axios.post( 
            process.env.REACT_APP_BACKEND_URL + '/api/auth/register', 
            { 
                registrationType: signupMethod,
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

    // Login with google 
    const requestUserLogin = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/login', { 
            loginType: signupMethod,
            userData: userData,
        })
        .then((response) => {
            setUserData(response.data); // Google user data
            setErrorStatus(200);
            setErrorMessage("");
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                // Wrong email.
                setErrorMessage(error.response.data.message);
                setErrorStatus(401);
            } else { // Unexpected error
                setErrorMessage('An error occurred. Please try again.');
            }
        });
    }

    // Get the email inputted by user
    const getEmailUserData = () => {
        let email = document.getElementById("signup-form-input-email").value;
        return ({email: email});
    }
    
    /**
     * Function for handling onClick() event of .signup-form-submit-button html element.
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    

    return (
        <div className="signup-container">
            <button className="signup-google-link" onClick={googleSignup}>
                <img src={svgs["icon-google.svg"]} alt="Google Icon" className="signup-google-icon" />
                Express Login with Google
            </button>
            <span className="signup-partition">
                <hr />
                <span>Or</span>
                <hr />
            </span>
            <form action="#" method="" className="signup-form">
                <div className="signup-form-input">
                    <div className="signup-form-linkyo-title">linkyo.io/</div>
                    <input type="email" className="" id="signup-form-input-email" placeholder="Enter Username" /> 
                </div>
                <button type="button" className="signup-form-submit-button" onClick={emailSignup}>
                    Sign Up
                    {/* <img src={svgs["arrow.svg"]} alt="Arrow" className="signup-form-arrow" /> */}
                    <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="signup-form-arrow">
                        <path d="M1.57544 1L9.28772 7L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </form>
            <div className="signup-error">
                <p> { errorStatus !== 200 && errorStatus !== 409 ? errorMessage : "" } </p>
            </div>
        </div>
    );
}