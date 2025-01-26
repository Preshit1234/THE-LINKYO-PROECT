import styles from "./index.module.css";
import { useState, useEffect, useRef } from "react";
import { importAssets } from "../../../../components/js/import-data.js";

/**
 * An component that displays the "Password" label and a password/text input field. And handles the input validation.
 *
 * @component
 * @example
 * return <Password componentValue="" componentIdPrefix="" componentRef="" />
 *
 * @param {object} props - The props object.
 * @param {string} props.componentValue - Wrapper for the html `value` attribute for input element.
 * @param {string} props.componentIdPrefix - The value of this prop along with a hyphen will be attached to the left of the `id` of the input element.
 * @param {React.RefObject<HTMLInputElement} props.componentRef - An external ref to access the input element.
 * @returns {JSX.Element}
 */
export default function Password(props) {
    /**
     * Value of the input element and its setter.
     */
    const [componentValue, setComponentValue] = useState("");

    /**
     * Prefix of the `id` attribute of input element and its setter.
     */
    const [componentIdPrefix, setComponentIdPrefix] = useState("");

    /**
     * External ref to access the input element and its setter.
     */
    const [componentRef, setComponentRef] = useState();

    /**
     * A state to store whether the user wants to view the password or not.
     */
    const [showPassword, setShowPassword] = useState(false);

    /**
     * A ref to access the input element.
     */
    const inputRef = useRef();

    /**
     * Check if the props are set and initialize their values to their corresponding states.
     */
    useEffect(() => {
        if (!!props.componentValue === true)
            setComponentValue(props.componentValue);
        if (!!props.componentIdPrefix === true)
            setComponentIdPrefix(props.componentIdPrefix + "-");
        if (!!props.componentRef === true) setComponentRef(props.componentRef);
    }, [props.componentValue, props.componentIdPrefix, props.componentRef]);

    /**
     * Set the appropriate input type when the user wants to view the password or not.
     */
    useEffect(() => {
        if (!!componentRef === true && !!inputRef === true) {
            showPassword
                ? (inputRef.current.type = "text")
                : (inputRef.current.type = "password");
        }
    }, [componentRef, showPassword, inputRef]);

    const svgs = importAssets("svgs");

    /**
     * Handle show password click event.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The click event object.
     */
    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    /**
     * Handle the input's change event.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The change event object.
     */
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

    return (
        <div className={styles.container}>
            <label
                htmlFor={componentIdPrefix + "input-password"}
                className={styles.label}
            >
                Password
            </label>
            <div className={styles.wrap}>
                <input
                    type="password"
                    id={componentIdPrefix + "input-password"}
                    className={styles.input}
                    placeholder="eXmp1P@s5w04d*"
                    value={componentValue}
                    onChange={handlePasswordChange}
                    ref={(el) => {
                        if (!!componentRef) componentRef.current = el;
                        inputRef.current = el;
                    }}
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
