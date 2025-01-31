import "./css/signup.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./form-input";
import axios from "axios";

/**
 * Signup Component.
 * Includes sign in with google optiom OR Sign in with email option
 * @returns {ReactNode} A react element for Signup process
 */
export default function Signup() {
    const navigate = useNavigate();

    // Refs
    const usernameInput = useRef();

    const handleSignupButton = async () => {
        if (!!usernameInput.current.value) {
            try {
                let checkUsername = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/users/check/username`,
                    {
                        username: usernameInput.current.value,
                    }
                );
                if (checkUsername.data.message === "username exists") {
                    alert("Username already in use");
                } else if (
                    checkUsername.data.message === "username does not exists"
                ) {
                    navigate("/signup", {
                        state: {
                            usernameInputValue: usernameInput.current.value,
                        },
                    });
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    };

    return (
        <div className="signup-container">
            <FormInput
                componentType="google"
                style={{
                    alignSelf: "center",
                    width: "400px",
                }}
            />
            <span className="signup-partition">
                <hr />
                <span>Or</span>
                <hr />
            </span>
            <form action="#" method="" className="signup-form">
                <div className="signup-form-input">
                    <div className="signup-form-linkyo-title">linkyo.io/</div>
                    <input
                        type="text"
                        className=""
                        id="signup-form-input-username"
                        placeholder="Enter Username"
                        ref={usernameInput}
                    />
                </div>
                <button
                    type="button"
                    className="signup-form-submit-button"
                    onClick={handleSignupButton}
                >
                    Sign Up
                    {/* <img src={svgs["arrow.svg"]} alt="Arrow" className="signup-form-arrow" /> */}
                    <svg
                        width="18"
                        height="8"
                        viewBox="0 0 18 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="signup-form-arrow"
                    >
                        <path
                            d="M1.57544 1L9.28772 7L17 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </form>
            <div className="signup-error">
                {/* <p> { errorStatus !== 200 && errorStatus !== 409 ? errorMessage : "" } </p> */}
            </div>
        </div>
    );
}
