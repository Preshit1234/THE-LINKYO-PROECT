import { useRef } from "react";
import Header from "../components/header";
import styles from "./css/dropperSignup.module.css";
import { useNavigate } from "react-router-dom";

export default function DropperSignup() {
    const section1Ref = useRef();
    const section2Ref = useRef();
    const navigate = useNavigate();

    const handleNextButton = (e) => {
        e.preventDefault();
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
                <form
                    action=""
                    method=""
                    className={styles.orgainzationRegistrationForm}
                >
                    <label htmlFor="organizationName">
                        Organization Name:
                        <input
                            type="text"
                            name="organizationName"
                            id="organizationName"
                        />
                    </label>
                    <br />
                    <label htmlFor="organizationEmail">
                        Organization Email:
                        <input
                            type="email"
                            name="organizationEmail"
                            id="organizationEmail"
                        />
                    </label>
                    <br />
                    <label htmlFor="organizationContact">
                        Organization Contact Number:
                        <input
                            type="number"
                            name="organizationContact"
                            id="organizationContact"
                        />
                    </label>
                    <br />
                    <label htmlFor="organizationAddress">
                        Organization Address:
                        <textarea
                            name="organizationAddress"
                            id="organizationAddress"
                        />
                    </label>
                    <br />
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
