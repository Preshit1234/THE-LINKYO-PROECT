import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperRolesPage() {
    return (
        <DropperLayout activeLink="view-roles">
            <div className={styles.container}>Roles</div>
        </DropperLayout>
    );
}
