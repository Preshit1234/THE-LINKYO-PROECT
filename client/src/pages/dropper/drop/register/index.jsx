import styles from "./index.module.css";
import DropperLayout from "../../../../layouts/dropper";

export default function DropRegistrationPage() {
    return (
        <DropperLayout>
            <div className={styles.container}>
                <form action="" method="" className={styles.form}>
                    Flow:
                    <br />
                    Select Product
                    <br />
                    Select Offer
                    <br />
                    Include toggle button for Promoter approval requirement
                    <br />
                    Preview button - will open a modal or a new tab link
                    <br />
                </form>
            </div>
        </DropperLayout>
    );
}
