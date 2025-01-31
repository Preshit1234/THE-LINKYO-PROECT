import styles from "./index.module.css";

export default function DropperUserRegistrationPage() {
    const handleRegisterButton = () => {};
    return (
        <div className={styles.container}>
            <form action="" method="" className={styles.form}>
                <label htmlFor="dropperUserRegistrationPageInputEmail">
                    Email:
                    <br />
                    <input
                        type="email"
                        name="dropperUserRegistrationPageInputEmail"
                        id="dropperUserRegistrationPageInputEmail"
                    />
                </label>
                <label htmlFor="dropperUserRegistrationPageInputUserName">
                    Username:
                    <br />
                    <input
                        type="text"
                        name="dropperUserRegistrationPageInputUserName"
                        id="dropperUserRegistrationPageInputUserName"
                    />
                </label>
                <label htmlFor="dropperUserRegistrationPageInputPassword">
                    Password:
                    <br />
                    <input
                        type="password"
                        name="dropperUserRegistrationPageInputPassword"
                        id="dropperUserRegistrationPageInputPassword"
                    />
                </label>
                {/* Add input for role selection */}
                <label htmlFor="dropperUserRegistrationPageInputRole">
                    Role:{" "}
                    <select
                        name="dropperUserRegistrationPageInputRole"
                        id="dropperUserRegistrationPageInputRole"
                    >
                        <option value="" disabled selected>
                            Select a role...
                        </option>
                        <option value="admin">Admin</option>
                        <option value="developer">Developer</option>
                        {/* Other options will contain the roles created in the dropper account */}
                        <option value="other">Other</option>
                    </select>
                </label>
                <button onClick={handleRegisterButton}>Register</button>
            </form>
        </div>
    );
}
