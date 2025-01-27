import styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { importAssets } from "../../../js/import-data";
import { useUser } from "../../../../contexts/UserContext";
import axios from "axios";

/**
 * A component that displays the Google sign-in button. And handles the sign-in logic.
 *
 * @component
 * @example
 * return <Google style={{}} />
 *
 * @param {object} props - The props object.
 * @param {React.CSSProperties} [props.style] - Inline styles to apply to the button.
 * @returns {JSX.Element}
 */
export default function Google(props) {
    /**
     * Store user data obtained from google.
     */
    const [googleUserData, setGoogleUserData] = useState(null);

    /**
     * Store user data obtained after successful sign-up or sign-in.
     */
    const [loginUserData, setLoginUserData] = useState(null);

    const navigate = useNavigate();
    const { setUser } = useUser();

    const svgs = importAssets("svgs");

    /**
     * Send Google user data to the backend for sign-up or sign-in.
     */
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
                    return;
                }
            };
            continueWithGoogle();
        }
    }, [googleUserData]);

    /**
     * If the user is register/logged in, set login user data in the user state of UserContext
     * to be accessible throughout our application and navigate to the appropriate page.
     */
    useEffect(() => {
        if (loginUserData) {
            setUser(loginUserData);
            !loginUserData.isWelcomed
                ? navigate("/welcome")
                : navigate("/browse/drops");
        }
    }, [loginUserData, navigate, setUser]);

    /**
     * Handle Google button's click event.
     */
    const handleGoogleBtnClick = useGoogleLogin({
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

    return (
        <button
            className={styles.googleButton}
            style={props.style}
            onClick={handleGoogleBtnClick}
        >
            <img
                src={svgs["icon-google.svg"]}
                alt="Google Icon"
                className={styles.googleIcon}
            />
            Continue up with Google
        </button>
    );
}
