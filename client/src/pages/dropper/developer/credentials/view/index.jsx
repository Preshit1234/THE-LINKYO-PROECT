import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

export default function DropperCredentialsPage() {
    const navigate = useNavigate();
    const handleCreateCredentialsButton = () => {
        navigate("/dropper/developer/credentials/register");
    };
    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <button
                    className={styles.createCredentialsButton}
                    onClick={handleCreateCredentialsButton}
                >
                    + Credentials
                </button>
            </div>
            <div className={styles.body}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Creation Date</th>
                            <th>Type</th>
                            <th>Client ID</th>
                            <th>Actions</th>
                            <th>Production Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Grammarly</td>
                            <td>24 Aug 2024</td>
                            <td>Web Application</td>
                            <td>sf94jfb0rng9we8f9hd0...</td>
                            <td>Edit, Delete</td>
                            <td>
                                <button>Enable</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
