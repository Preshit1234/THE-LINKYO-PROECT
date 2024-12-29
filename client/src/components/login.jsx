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
import { useUser } from '../contexts/UserContext';

/**
 * An UI component which handles user login process.
 * @returns {ReactNode}
 */
const Login = (props) => {
    // const redirectedEmailValue = "";
    // if (props) {
    //     redirectedEmailValue = props.redirectedEmailValue;
    // }

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

    // Animate login input 
    const changeInputOption = contextSafe(() => {
        gsap.fromTo("#login-form-input-email", {y: 0, alpha: 1}, {y: -100, alpha: 0});
        gsap.fromTo("#login-form-input-login-code", {y: 100, alpha: 0}, {y: 0, alpha: 1}); 
    });

    // States
    const [googleUserData, setGoogleUserData] = useState(null);
    const [loginUserData, setLoginUserData] = useState(null);

    // Contexts
    const {user, setUser} = useUser();

    // Effects
    useEffect(() => {
        if(googleUserData) {
            continueWithGoogle();
        }
    }, [googleUserData]);

    useEffect(() => {
        if(loginUserData) {
            setUser(loginUserData);
            !loginUserData.isWelcomed ? navigate('/welcome') : navigate('/browse/drops');
        }
    }, [loginUserData]);

    // Functions
    const continueWithGoogle = async () => {
        try {
            let googleUser = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, {
                googleUserData: googleUserData,
            });
            setLoginUserData(googleUser.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleGoogleBtn = useGoogleLogin({
        // onSuccess: tokenResponse => console.log(tokenResponse),
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
            );
            setGoogleUserData(userInfo.data);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const setEmail = () => {

    }

    const emailLogin = () => {

    }

    return (
        <div id="login-container">
            <form action="#" method="" className="login-form" ref={loginForm}>
                <div id="login-form-input-container">
                    <input type="email" className="login-form-input" id="login-form-input-email" placeholder="Enter Your Email Address" onChange={setEmail} value={props.redirectedEmailValue} />
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
            <div className="login-google-link" onClick={handleGoogleBtn}>
                <img src={svgs["icon-google.svg"]} alt="Google Icon" className="login-google-icon" />
                Express Login with Google
            </div>
            <div className="login-error">
                {/* <p> { errorStatus !== 200 && errorStatus !== 401 ? errorMessage : "" } </p> */}
            </div>
        </div>
    );
}

export default Login;