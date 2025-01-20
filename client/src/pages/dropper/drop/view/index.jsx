import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperDropsPage() {
    return (
        <DropperLayout activeLink="view-drops">
            <div className={styles.container}>Drops</div>
        </DropperLayout>
    );
}
