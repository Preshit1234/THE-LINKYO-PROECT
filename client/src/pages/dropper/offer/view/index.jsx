import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperOffersPage() {
    return (
        <DropperLayout activeLink="view-offers">
            <div className={styles.container}>Offers</div>
        </DropperLayout>
    );
}
