import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperDashboard() {
    return (
        <DropperLayout activeLink="view-dashboard">
            <div className={styles.container}>Dashboard</div>
        </DropperLayout>
    );
}
