import { NavLink } from "react-router-dom";
import styles from "./css/Sidebar.module.css";
import { importAll } from "../components/js/import-data.js";

export default function Sidebar() {
    let svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    return (
        <nav className={styles.container}>
            <NavLink to="" className={styles.links}>
                <img src={svgs["home.svg"]} alt="" className={styles.icons} />
                Home
            </NavLink>
            <NavLink to="" className={styles.links}>
                <img src={svgs["cart.svg"]} alt="" className={styles.icons} />
                Analytics
            </NavLink>
            <NavLink to="" className={styles.links}>
                <img
                    src={svgs["peoples.svg"]}
                    alt=""
                    className={styles.icons}
                />
                Promotions
            </NavLink>
            <NavLink to="" className={styles.links}>
                <img src={svgs["cart.svg"]} alt="" className={styles.icons} />
                Business
            </NavLink>
            <NavLink to="" className={styles.links}>
                <img
                    src={svgs["peoples.svg"]}
                    alt=""
                    className={styles.icons}
                />
                Settings
            </NavLink>
            <NavLink to="" className={styles.links}>
                <img
                    src={svgs["peoples.svg"]}
                    alt=""
                    className={styles.icons}
                />
                Help
            </NavLink>
        </nav>
    );
}
