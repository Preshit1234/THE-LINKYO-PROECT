import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperUsersPage() {
    return (
        <DropperLayout activeLink="view-users">
            <div className={styles.container}>Users</div>
        </DropperLayout>
    );
}
