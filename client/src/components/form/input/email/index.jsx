import styles from "./index.module.css";
import { useState, useEffect } from "react";

/**
 * A component that displays the "Email" label and an email input field. And handles the input validation.
 *
 * @component
 * @example
 * return <Email componentValue="" componentIdPrefix="" componentRef="" />
 *
 * @param {object} props - The props object.
 * @param {string} props.componentValue - Wrapper for the html `value` attribute for input element.
 * @param {string} props.componentIdPrefix - The value of this prop along with a hyphen will be attached to the left of the `id` of the input element.
 * @param {React.RefObject<HTMLInputElement} props.componentRef - An external ref to access the input element.
 * @returns {JSX.Element}
 */
export default function Email(props) {
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
     * Check if the props are set and initialize their values to their corresponding states.
     */
    useEffect(() => {
        if (!!props.componentValue === true)
            setComponentValue(props.componentValue);
        if (!!props.componentIdPrefix === true)
            setComponentIdPrefix(props.componentIdPrefix + "-");
        if (!!props.componentRef === true) setComponentRef(props.componentRef);
    }, [props.componentValue, props.componentIdPrefix, props.componentRef]);

    return (
        <div className={styles.container}>
            <label
                htmlFor={componentIdPrefix + "input-email"}
                className={styles.label}
            >
                Email
            </label>
            <input
                type="email"
                id={componentIdPrefix + "input-email"}
                className={styles.wrap + " " + styles.input}
                placeholder="user@example.com"
                value={componentValue}
                onChange={(e) => setComponentValue(e.target.value)}
                ref={componentRef}
            />
        </div>
    );
}
