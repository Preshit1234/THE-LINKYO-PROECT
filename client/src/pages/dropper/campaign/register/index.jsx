import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropperCampaignRegistrationPage() {
    return (
        <DropperLayout activeLink="view-campaigns">
            <div className={styles.container}>Campaigns</div>
        </DropperLayout>
    );
}
