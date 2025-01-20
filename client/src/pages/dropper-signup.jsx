import { useRef } from "react";
import Header from "../components/header";
import styles from "./css/dropperSignup.module.css";
// import { useNavigate } from "react-router-dom";
import FormInput from "../components/form-input";
// import { Icon } from "@iconify/react";
// import axios from "axios";

export default function DropperSignup() {
    const organizationNameRef = useRef();
    const organizationEmailRef = useRef();
    const organizationContactRef = useRef();
    const organizationAddressRef = useRef();
    // const navigate = useNavigate();

    const handleNextButton = (e) => {
        e.preventDefault();
        const organizationRegistrationFormData = {
            name: organizationNameRef.current.value,
            email: organizationEmailRef.current.value,
            contact: organizationContactRef.current.value,
            address: organizationAddressRef.current.value,
        };
        // try {
        //     const registeredOrganizationData = axios.post(
        //         `${process.env.REACT_APP_BACKEND_URL}/api/dropper/organization/create`,
        //         organizationRegistrationFormData
        //     );
        //     console.log(
        //         "Registered organization data: ",
        //         registeredOrganizationData
        //     );
        //     // navigate("/dropper/product/register");
        // } catch (err) {
        //     console.log("Dropper organization registration error: ", err);
        // }
        console.log(
            "Organization registration form data: ",
            organizationRegistrationFormData
        );
    };
    return (
        <div className={styles.container}>
            <Header />
            <section className={styles.section1}>
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
        </div>
    );
}
