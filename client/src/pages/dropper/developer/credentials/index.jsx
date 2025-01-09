import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperCredentialsPage() {
    return (
        <DropperLayout>
            <div className={styles.container}>
                <form action="" method="" className={styles.form}>
                    <label htmlFor="">
                        Name : <br />
                        <input type="text" />
                    </label>
                </form>
            </div>
        </DropperLayout>
    );
}
