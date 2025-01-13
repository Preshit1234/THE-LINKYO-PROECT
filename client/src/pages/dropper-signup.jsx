import { useRef, useState } from "react";
import Header from "../components/header";
import styles from "./css/dropperSignup.module.css";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/form-input";

export default function DropperSignup() {
    const [organizationName, setOrganizationName] = useState();
    const [organizationEmail, setOrganizationEmail] = useState();
    const [organizationContact, setOrganizationContact] = useState();
    const [organizationAddress, setOrganizationAddress] = useState();

    const organizationNameRef = useRef();
    const organizationEmailRef = useRef();
    const organizationContactRef = useRef();
    const organizationAddressRef = useRef();

    const section1Ref = useRef();
    const section2Ref = useRef();
    const navigate = useNavigate();

    const handleNextButton = (e) => {
        e.preventDefault();
        // console.log("Organization Form Data: ", {
        //     organizationName: organizationName,
        //     organizationEmail: organizationEmail,
        //     organizationContact: organizationContact,
        //     organizationAddress: organizationAddress,
        // });
        section2Ref.current.scrollIntoView({ behavior: "smooth" });
    };
    const handleContinueButton = (e) => {
        e.preventDefault();
        navigate("/dropper/product/register");
    };
    const handleBackButton = (e) => {
        e.preventDefault();
        section1Ref.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.container}>
            <Header />
            <section className={styles.section1} ref={section1Ref}>
                <h1>Register your Organization</h1>
                <form
                    action=""
                    method=""
                    className={styles.orgainzationRegistrationForm}
                >
                    <FormInput
                        componentType="name"
                        componentIdPrefix="organizationForm"
                        componentRef={organizationNameRef}
                    />
                    <FormInput
                        componentType="email"
                        componentIdPrefix="organizationForm"
                        componentRef={organizationEmailRef}
                    />
                    <FormInput
                        componentType="contact"
                        componentIdPrefix="organizationForm"
                        componentRef={organizationContactRef}
                    />
                    <FormInput
                        componentType="address"
                        componentIdPrefix="organizationForm"
                        componentRef={organizationAddressRef}
                    />
                    <button onClick={handleNextButton}>Next</button>
                </form>
            </section>
            <section className={styles.section2} ref={section2Ref}>
                <button
                    className={styles.backButton}
                    onClick={handleBackButton}
                >
                    Back
                </button>
                <form
                    action=""
                    method=""
                    className={styles.adminRegistrationForm}
                >
                    <label htmlFor="adminEmail">
                        Admin Email:
                        <input type="email" name="adminEmail" id="adminEmail" />
                    </label>
                    <br />
                    <label htmlFor="adminUsername">
                        Admin Name:
                        <input
                            type="text"
                            name="adminUsername"
                            id="adminUsername"
                        />
                    </label>
                    <br />
                    <label htmlFor="adminPassword">
                        Admin Password:
                        <input
                            type="number"
                            name="adminPassword"
                            id="adminPassword"
                        />
                    </label>
                    <br />
                    <button onClick={handleContinueButton}>Continue</button>
                </form>
            </section>
        </div>
    );
}
