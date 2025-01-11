import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperProductsPage() {
    return (
        <DropperLayout activeLink="view-products">
            <div className={styles.container}>Products</div>
        </DropperLayout>
    );
}
