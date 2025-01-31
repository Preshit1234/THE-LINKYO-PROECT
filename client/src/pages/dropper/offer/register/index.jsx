import styles from "./index.module.css";

export default function OfferRegistrationPage() {
    return (
        <div className={styles.container}>
            <form action="" method="" className={styles.form}>
                <label htmlFor="offerRegistrationPageInputProductId">
                    Product ID:
                    <br />
                    <input
                        type="text"
                        name="offerRegistrationPageInputProductId"
                        id="offerRegistrationPageInputProductId"
                    />
                </label>
                <label htmlFor="offerRegistrationPageInputProductId">
                    Original Price:
                    <br />
                    <input
                        type="number"
                        name="offerRegistrationPageInputProductId"
                        id="offerRegistrationPageInputProductId"
                    />
                </label>
                <label htmlFor="offerRegistrationPageInputProductId">
                    Offer Price:
                    <br />
                    <input
                        type="text"
                        name="offerRegistrationPageInputProductId"
                        id="offerRegistrationPageInputProductId"
                    />
                </label>
                <label htmlFor="offerRegistrationPageInputProductId">
                    Offer Description:
                    <br />
                    <input
                        type="number"
                        name="offerRegistrationPageInputProductId"
                        id="offerRegistrationPageInputProductId"
                    />
                </label>
                <label htmlFor="offerRegistrationPageInputStartDate">
                    Start Date:
                    <br />
                    <input
                        type="date"
                        name="offerRegistrationPageInputStartDate"
                        id="offerRegistrationPageInputStartDate"
                    />
                </label>
                <label htmlFor="offerRegistrationPageInputExpiryDate">
                    Expiry Date:
                    <br />
                    <input
                        type="date"
                        name="offerRegistrationPageInputExpiryDate"
                        id="offerRegistrationPageInputExpiryDate"
                    />
                </label>
                <button>Register</button>
            </form>
        </div>
    );
}
