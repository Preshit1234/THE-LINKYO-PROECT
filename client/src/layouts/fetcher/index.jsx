import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import styles from "./index.module.css";
import { Outlet } from "react-router-dom";

export default function FetcherLayout() {
    return (
        <div className={styles.container}>
            <Header type="login" />
            <Sidebar />
            <div className={styles.main}>
                <Outlet />
            </div>
        </div>
    );
}
