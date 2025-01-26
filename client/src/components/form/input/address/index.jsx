import styles from "./index.module.css";
import { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

/**
 * A component that displays the "Address" label and a textarea input field. And handles the input validation.
 *
 * @component
 * @example
 * return <Address componentValue="" componentIdPrefix="" componentRef="" />
 *
 * @param {object} props - The props object.
 * @param {string} props.componentValue - Wrapper for the html `value` attribute for input element.
 * @param {string} props.componentIdPrefix - The value of this prop along with a hyphen will be attached to the left of the `id` of the input element.
 * @param {React.RefObject<HTMLInputElement} props.componentRef - An external ref to access the input element.
 * @returns {JSX.Element}
 */
export default function Address(props) {
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
     * Ref for the input field.
     */
    const addressInputRef = useRef();

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
     * Sets the appropriate textarea input value after re-render.
     * It is done this way because textarea does not have value attribute.
     */
    useEffect(() => {
        if (!!addressInputRef.current.value === false)
            addressInputRef.current.value = componentValue;
    }, [componentValue, addressInputRef]);

    /**
     * Handles the address input's onChange event.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The change event object.
     */
    const handleAddressChange = (e) => {
        e.preventDefault();
        setComponentValue(e.target.value);
    };

    return (
        <div className={styles.container}>
            <label
                htmlFor={componentIdPrefix + "input-address"}
                className={styles.label}
            >
                Address
            </label>
            <TextareaAutosize
                id={componentIdPrefix + "input-address"}
                className={styles.wrap + " " + styles.input}
                placeholder="..."
                onChange={handleAddressChange}
                ref={(el) => {
                    if (!!componentRef) componentRef.current = el;
                    addressInputRef.current = el;
                }}
                autoFocus
            />
        </div>
    );
}
