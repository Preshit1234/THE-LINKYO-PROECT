import styles from "./index.module.css";
import Header from "../../components/header";
import { NavLink } from "react-router-dom";

export default function DropperLayout({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <div className={styles.sidebar}>
                    <NavLink
                        to={"/dropper/product/register"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Register New Product
                    </NavLink>
                    <NavLink
                        to={"/dropper/offer/register"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Create New Offer
                    </NavLink>
                    <NavLink
                        to={"/dropper/user/register"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Create New User
                    </NavLink>
                    <NavLink
                        to={"/dropper/role/register"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Create New Role
                    </NavLink>
                    <NavLink
                        to={"/dropper/drop/register"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Create New Drop
                    </NavLink>
                    <NavLink
                        to={"/dropper/developer/credentials"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Developer Console - Credentials
                    </NavLink>
                </div>
                <div className={styles.main}>{children}</div>
            </div>
        </div>
    );
}
