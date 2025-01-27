import styles from "./index.module.css";
import { useState, useEffect, useRef } from "react";
import { countries } from "../../../../helper.js";
import { Icon } from "@iconify/react";
import isMobilePhone from "validator/lib/isMobilePhone";

/**
 * A component that displays the "Contact" label and a textarea input field. And handles the input validation.
 *
 * @component
 * @example
 * return <Contact componentValue="" componentIdPrefix="" componentRef="" />
 *
 * @param {object} props - The props object.
 * @param {string} props.componentValue - Wrapper for the html `value` attribute for input element.
 * @param {string} props.componentIdPrefix - The value of this prop along with a hyphen will be attached to the left of the `id` of the input element.
 * @param {React.RefObject<HTMLInputElement} props.componentRef - An external ref to access the input element.
 * @returns {JSX.Element}
 */
export default function Contact(props) {
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
     * Stores whether the country selection option is open.
     */
    const [isCountrySelectionOpen, setIsCountrySelectionOpen] = useState(false);

    /**
     * Stores the selected country's flag code. Used to get the country's flag icon.
     */
    const [countryFlagCode, setCountryFlagCode] = useState("in");

    /**
     * Stores the selected country's phone code prefixed with "+". Used to validate the complete contact number.
     */
    const [countryPhoneCode, setCountryPhoneCode] = useState("+91");

    /**
     * Stores whether the complete contact number is validated or not.
     */
    const [isContactValidated, setIsContactValidated] = useState(false);

    /**
     * Stores the complete contact number. It is obtained by concatenating countryFlagCode and countryPhoneCode
     */
    const [completeContactNumber, setCompleteContactNumber] = useState("");

    /**
     * A ref to access country selection options
     */
    const countrySelectionOptionsRef = useRef();

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
     * Handle country selection display block's click event.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The click event object.
     */
    const handleCountrySelectionDisplay = (e) => {
        e.preventDefault();
        setIsCountrySelectionOpen(!isCountrySelectionOpen);
    };

    /**
     * Handle selection option block's click event.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The click event object.
     */
    const handleCountrySelectionOptions = (e) => {
        setCountryFlagCode(e.currentTarget.dataset.countrycode.toLowerCase());
        setCountryPhoneCode("+" + e.currentTarget.dataset.countryphone);
        setIsCountrySelectionOpen(false);
        setComponentValue({});
        setIsContactValidated(false);
    };

    /**
     * Handle contact input's change event.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The click event object.
     */
    const handleContactInputChange = (e) => {
        const completeContactNumber = countryPhoneCode + e.target.value;
        // const isMobilePhone = isMobilePhone();
        // console.log(isMobilePhone(completeContactNumber));
        setIsContactValidated(isMobilePhone(completeContactNumber));
        setComponentValue({
            contactCountryPhoneCode: countryPhoneCode,
            contactPhoneNumber: e.target.value,
            completeContactNumber: completeContactNumber,
        });
        setCompleteContactNumber(completeContactNumber);
    };

    return (
        <div className={styles.container}>
            <label
                htmlFor={componentIdPrefix + "input-contact"}
                className={styles.label}
            >
                Contact
            </label>
            <div
                className={styles.wrap}
                style={{
                    borderColor: isContactValidated ? "#0F9D58" : "#606060",
                }}
            >
                <div
                    className={styles.countrySelectionDisplay}
                    onClick={handleCountrySelectionDisplay}
                    style={{
                        borderColor: isContactValidated ? "#0F9D58" : "#606060",
                    }}
                >
                    <Icon icon={"flag:" + countryFlagCode + "-4x3"} />
                    <strong>{countryPhoneCode}</strong>
                    <Icon
                        icon="icon-park-solid:down-one"
                        width="16"
                        height="16"
                    />
                </div>
                <input
                    type="tel"
                    id={componentIdPrefix + "input-contact"}
                    className={styles.input}
                    onChange={handleContactInputChange}
                    data-val={componentValue}
                />
                <input
                    type="hidden"
                    value={completeContactNumber}
                    ref={componentRef}
                />
                <div
                    className={styles.optionsWrap}
                    ref={countrySelectionOptionsRef}
                    style={{
                        display: isCountrySelectionOpen ? "block" : "none",
                    }}
                >
                    {countries.map((country) => (
                        <div
                            className={styles.options}
                            data-countryname={country.name}
                            data-countrycode={country.code}
                            data-countryphone={country.phone}
                            onClick={handleCountrySelectionOptions}
                            key={countries.indexOf(country)}
                        >
                            <Icon
                                icon={`flag:${country.code.toLowerCase()}-4x3`}
                            />
                            <span className={styles.optionsCountryName}>
                                {country.name}
                            </span>
                            <span>{`+${country.phone}`}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
