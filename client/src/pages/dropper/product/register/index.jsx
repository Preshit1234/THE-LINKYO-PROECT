import styles from "./index.module.css";

export default function ProductRegistrationPage() {
    const handleRegisterButton = () => {};

    return (
        <div className={styles.container}>
            <form action="" method="" className={styles.form}>
                <label htmlFor="productRegistrationPageInputName">
                    Name:
                    <br />
                    <input
                        type="text"
                        name="productRegistrationPageInputName"
                        id="productRegistrationPageInputName"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputDescription">
                    Description:
                    <br />
                    <textarea
                        name="productRegistrationPageInputDescription"
                        id="productRegistrationPageInputDescription"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputLogo">
                    Logo:
                    <br />
                    <input
                        type="file"
                        name="productRegistrationPageInputLogo"
                        id="productRegistrationPageInputLogo"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputTagline">
                    Tagline:
                    <br />
                    <input
                        type="text"
                        name="productRegistrationPageInputTagline"
                        id="productRegistrationPageInputTagline"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputThumbnail">
                    Thumbnail:
                    <br />
                    <input
                        type="file"
                        name="productRegistrationPageInputThumbnail"
                        id="productRegistrationPageInputThumbnail"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputMedias">
                    Medias:
                    <br />
                    <input
                        type="file"
                        name="productRegistrationPageInputMedias"
                        id="productRegistrationPageInputMedias"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputUsageType">
                    Usage Type:
                    <br />
                    <input
                        type="radio"
                        name="productRegistrationPageInputUsageType"
                        id="productRegistrationPageInputUsageType1"
                        value="Subscription Based"
                    />{" "}
                    Subscription Based <br />
                    <input
                        type="radio"
                        name="productRegistrationPageInputUsageType"
                        id="productRegistrationPageInputUsageType2"
                        value="Limited Usage"
                    />{" "}
                    Limited Usage <br />
                    <input
                        type="radio"
                        name="productRegistrationPageInputUsageType"
                        id="productRegistrationPageInputUsageType3"
                        value="Lifetime Usage"
                    />{" "}
                    Lifetime Usage <br />
                </label>
                <label htmlFor="productRegistrationPageInputProductUrl">
                    Product URL:
                    <br />
                    <input
                        type="text"
                        name="productRegistrationPageInputProductUrl"
                        id="productRegistrationPageInputProductUrl"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputPrivacyPolicyUrl">
                    Product Privacy Policy URL:
                    <br />
                    <input
                        type="text"
                        name="productRegistrationPageInputPrivacyPolicyUrl"
                        id="productRegistrationPageInputPrivacyPolicyUrl"
                    />
                </label>
                <label htmlFor="productRegistrationPageInputTermsAndConditionsUrl">
                    Product Terms and Conditons of use URL:
                    <br />
                    <input
                        type="text"
                        name="productRegistrationPageInputTermsAndConditionsUrl"
                        id="productRegistrationPageInputTermsAndConditionsUrl"
                    />
                </label>
                <button onClick={handleRegisterButton}>Register</button>
            </form>
        </div>
    );
}
