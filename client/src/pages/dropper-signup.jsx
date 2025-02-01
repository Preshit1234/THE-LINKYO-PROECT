import { useRef } from "react";
import Header from "../components/header";
import styles from "./css/dropperSignup.module.css";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/form-input";
// import { Icon } from "@iconify/react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

export default function DropperSignup() {
    const organizationNameRef = useRef();
    const organizationEmailRef = useRef();
    const organizationContactRef = useRef();
    const organizationAddressRef = useRef();
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const handleNextButton = async (e) => {
        e.preventDefault();
        const organizationRegistrationFormData = {
            name: organizationNameRef.current.value,
            email: organizationEmailRef.current.value,
            contact: organizationContactRef.current.value,
            address: organizationAddressRef.current.value,
        };
        console.log(
            "Organization registration form data: ",
            organizationRegistrationFormData
        );
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/dropper/organization/create`,
                organizationRegistrationFormData,
                {
                    headers: {
                        token: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            console.log("Registered organization data: ", res);
            setUser(res.data.user);
            navigate("/dropper/dashboard");
        } catch (err) {
            console.log("Dropper organization registration error: ", err);
        }
    };

    return (
        <>
            <Header type="login" userData={user} />
            <div className={styles.container}>
                <section className={styles.section1}>
                    <h1 className={styles.title}>Register your Organization</h1>
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
                        <button
                            onClick={handleNextButton}
                            className={styles.nextButton}
                        >
                            Next
                        </button>
                    </form>
                </section>
            </div>
        </>
    );
}
