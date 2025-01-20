import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperDeveloperConsolePage() {
    return (
        <DropperLayout activeLink="view-developer-console">
            <div className={styles.container}>Developer Console</div>
        </DropperLayout>
    );
}
