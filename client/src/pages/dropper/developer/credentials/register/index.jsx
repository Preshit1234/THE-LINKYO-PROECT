import styles from "./index.module.css";
import { useState, useEffect } from "react";

export default function DropperCredentialRegistrationPage() {
    const [originUriInputCount, setOriginUriInputCount] = useState(0);
    const [redirectUriInputCount, setRedirectUriInputCount] = useState(0);
    useEffect(() => {});
    const handleAddOriginUriButton = (e) => {
        e.preventDefault();
        setOriginUriInputCount(originUriInputCount + 1);
    };
    const handleAddRedirectUriButton = (e) => {
        e.preventDefault();
        setRedirectUriInputCount(redirectUriInputCount + 1);
    };
    return (
        <div className={styles.container}>
            <form action="" method="" className={styles.form}>
                <div>
                    <label htmlFor="">Select your application type</label>
                    <select name="" id="">
                        <option value="" disabled selected hidden>
                            Application Type
                        </option>
                        <option value="webApp">Web Application</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Select Product</label>
                    <select name="" id="">
                        <option value="" disabled selected hidden>
                            Select Product...
                        </option>
                        {/* Will include products registered in the account */}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Authorized Javascript Origin</label>
                    <div className={styles.originUriInputGroup}>
                        {Array.from({ length: originUriInputCount }).map(
                            (_, index) => (
                                <div>
                                    <input
                                        key={`originUriInput${index}`} // Use index as a unique key
                                        type="text"
                                        placeholder="https://www.example.com"
                                        id={`originUriInput${index + 1}`}
                                        name={`originUriInput${index + 1}`}
                                        className={styles.originUriInput}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <button onClick={handleAddOriginUriButton}>
                        + Add URI
                    </button>
                </div>
                <div>
                    <label htmlFor="">Authorized Javascript Redirect</label>
                    <div className={styles.originUriInputGroup}>
                        {Array.from({ length: redirectUriInputCount }).map(
                            (_, index) => (
                                <div>
                                    <input
                                        key={`redirectUriInput${index}`} // Use index as a unique key
                                        type="text"
                                        placeholder="https://www.example.com"
                                        id={`redirectUriInput${index + 1}`}
                                        name={`redirectUriInput${index + 1}`}
                                        className={styles.redirectUriInput}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <button onClick={handleAddRedirectUriButton}>
                        + Add URI
                    </button>
                </div>
                <div>
                    <button>Create</button>
                    <button>Cancel</button>
                </div>
            </form>
        </div>
    );
}
