import { useRef } from "react";
import Header from "../components/header";
import styles from "./css/dropperSignup.module.css";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/form-input";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function DropperSignup() {
    const organizationNameRef = useRef();
    const organizationEmailRef = useRef();
    const organizationContactRef = useRef();
    const organizationAddressRef = useRef();

    const adminUsernameRef = useRef();
    const adminEmailRef = useRef();
    const adminPasswordRef = useRef();

    const section1Ref = useRef();
    const section2Ref = useRef();
    // const navigate = useNavigate();

    const handleNextButton = (e) => {
        e.preventDefault();
        section2Ref.current.scrollIntoView({ behavior: "smooth" });
    };
    const handleCreateAdminAccountButton = async (e) => {
        e.preventDefault();
        const organizationRegistrationFormData = {
            name: organizationNameRef.current.value,
            email: organizationEmailRef.current.value,
            contact: organizationContactRef.current.value,
            address: organizationAddressRef.current.value,
        };
        const adminRegistrationFormData = {
            username: adminUsernameRef.current.value,
            email: adminEmailRef.current.value,
            password: adminPasswordRef.current.value,
        };
        try {
            const registeredOrganizationData = axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/dropper/organization/create`,
                organizationRegistrationFormData
            );
            console.log(
                "Registered organization data: ",
                registeredOrganizationData
            );
            try {
                const registeredAdminData = axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/dropper/organization/admin/create`,
                    adminRegistrationFormData
                );
                console.log("Registered Admin account: ", registeredAdminData);
            } catch (err) {
                console.log("Dropper admin account registration error: ", err);
            }
        } catch (err) {
            console.log("Dropper organization registration error: ", err);
        }
        // navigate("/dropper/product/register");
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
                    <Icon
                        icon="famicons:arrow-back"
                        width="50"
                        height="50"
                        className={styles.backButtonIcon}
                    />
                </button>
                <h1>Create your Admin account</h1>
                <form
                    action=""
                    method=""
                    className={styles.adminRegistrationForm}
                >
                    <FormInput
                        componentType="email"
                        componentIdPrefix="adminForm"
                        componentRef={adminEmailRef}
                    />
                    <FormInput
                        componentType="username"
                        componentIdPrefix="adminForm"
                        componentRef={adminUsernameRef}
                    />
                    <FormInput
                        componentType="password"
                        componentIdPrefix="adminForm"
                        componentRef={adminPasswordRef}
                    />
                    <button onClick={handleCreateAdminAccountButton}>
                        Create Admin Account
                    </button>
                </form>
            </section>
        </div>
    );
}
