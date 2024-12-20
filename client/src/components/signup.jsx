import './css/signup.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { importAll } from './js/import-data';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { isObjectEmpty, isStringEmpty, isDataFromOurDatabase } from '../helper';
import { useUser } from '../contexts/UserContext';

/**
 * Signup Component.
 * Includes sign in with google optiom OR Sign in with email option
 * @returns {ReactNode} A react element for Signup process
 */
export default function Signup() {

    const navigate = useNavigate();
    const svgs = importAll(require.context('../assets/svgs/', false, /.(png|jpe?g|svg)$/));

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
    

    return (
        <div className="signup-container">
            <button className="signup-google-link" onClick={handleGoogleBtn}>
                <img src={svgs["icon-google.svg"]} alt="Google Icon" className="signup-google-icon" />
                Continue up with Google
            </button>
            <span className="signup-partition">
                <hr />
                <span>Or</span>
                <hr />
            </span>
            <form action="#" method="" className="signup-form">
                <div className="signup-form-input">
                    <div>linkyo.io/</div>
                    <input type="email" className="" id="signup-form-input-email" placeholder="Enter Username" /> 
                </div>
                <button type="button" className="signup-form-submit-button">
                    Sign Up
                    {/* <img src={svgs["arrow.svg"]} alt="Arrow" className="signup-form-arrow" /> */}
                    <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="signup-form-arrow">
                        <path d="M1.57544 1L9.28772 7L17 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </form>
            <div className="signup-error">
                {/* <p> { errorStatus !== 200 && errorStatus !== 409 ? errorMessage : "" } </p> */}
            </div>
        </div>
    );
}