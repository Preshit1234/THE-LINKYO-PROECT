import { NavLink } from "react-router-dom";
import styles from "./css/Sidebar.module.css";
import { importAll } from "../components/js/import-data.js";

export default function Sidebar() {
    let svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    return (
        <nav className={styles.container}>
            <NavLink to="" className={styles.links + " " + styles.homeNavLink}>
                <img src={svgs["home.svg"]} alt="" className={styles.icons} />
                <span>Home</span>
            </NavLink>
            <NavLink
                to=""
                className={styles.links + " " + styles.analyticsNavLink}
            >
                <img src={svgs["cart.svg"]} alt="" className={styles.icons} />
                <span>Analytics</span>
            </NavLink>
            <NavLink
                to=""
                className={styles.links + " " + styles.promotionsNavLink}
            >
                <img
                    src={svgs["peoples.svg"]}
                    alt=""
                    className={styles.icons}
                />
                <span>Promotions</span>
            </NavLink>
            <NavLink
                to=""
                className={styles.links + " " + styles.businessNavLink}
            >
                <img src={svgs["cart.svg"]} alt="" className={styles.icons} />
                <span>Business</span>
            </NavLink>
            <NavLink
                to=""
                className={styles.links + " " + styles.settingsNavLink}
            >
                <img
                    src={svgs["peoples.svg"]}
                    alt=""
                    className={styles.icons}
                />
                <span>Settings</span>
            </NavLink>
            <NavLink to="" className={styles.links + " " + styles.helpNavLink}>
                <img
                    src={svgs["peoples.svg"]}
                    alt=""
                    className={styles.icons}
                />
                <span>Help</span>
            </NavLink>
        </nav>
    );
}
