import styles from "./index.module.css";
import { useState, useEffect, useRef } from "react";

/**
 * An component that displays the consent label and a checkbox input field.
 *
 * @component
 * @example
 * return <UsageConsentCheck componentValue="" componentIdPrefix="" componentRef="" />
 *
 * @param {object} props - The props object.
 * @param {boolean} props.componentValue - Wrapper for the html `value` attribute for input element.
 * @param {string} props.componentIdPrefix - The value of this prop along with a hyphen will be attached to the left of the `id` of the input element.
 * @param {React.RefObject<HTMLInputElement} props.componentRef - An external ref to access the input element.
 * @returns {JSX.Element}
 */
export default function UsageConsentCheck(props) {
    /**
     * Value of the input element and its setter.
     */
    const [componentValue, setComponentValue] = useState(false);

    /**
     * Prefix of the `id` attribute of input element and its setter.
     */
    const [componentIdPrefix, setComponentIdPrefix] = useState("");

    /**
     * External ref to access the input element and its setter.
     */
    const [componentRef, setComponentRef] = useState();

    /**
     * Stores whether the checkbox is checked or not.
     */
    const [isChecked, setIsChecked] = useState(false);

    /**
     * A ref to access the checkbox input.
     */
    const checkboxRef = useRef();

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
     * Initialize isChecked, and set it when checkboxRef changes
     */
    useEffect(() => {
        if (!!checkboxRef.current) setIsChecked(checkboxRef.current.checked);
    }, [checkboxRef]);

    /**
     * Mutate checkbox when isChecked changes.
     */
    useEffect(() => {
        if (!!checkboxRef.current) checkboxRef.current.checked = isChecked;
    }, [isChecked]);

    /**
     * Handle checkbox input's click event.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The event click object.
     */
    const handleCheckClick = (e) => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.checkboxWrapper4}>
            <input
                className={styles.inpCbx}
                id={componentIdPrefix + "usage-consent-check"}
                type="checkbox"
                value={componentValue}
                onClick={handleCheckClick}
                ref={(el) => {
                    if (!!componentRef) componentRef.current = el;
                    checkboxRef.current = el;
                }}
            />
            <label
                className={styles.cbx}
                htmlFor={componentIdPrefix + "usage-consent-check"}
            >
                <span>
                    <svg width="12px" height="10px">
                        <use href="#check-4"></use>
                    </svg>
                </span>
                <span>I agree to the privacy policy and cookie usage</span>
            </label>
            <svg className={styles.inlineSvg}>
                <symbol id="check-4" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
            </svg>
        </div>
    );
}
