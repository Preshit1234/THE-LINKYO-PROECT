import styles from "./index.module.css";
import Header from "../../components/header";
import { NavLink } from "react-router-dom";

export default function DropperLayout({ children, activeLink }) {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <div className={styles.sidebar}>
                    {/* <NavLink
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
                    </NavLink> */}
                    <NavLink
                        to={"/dropper/dashboard"}
                        className={
                            activeLink === "view-dashboard"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to={"/dropper/products"}
                        className={
                            activeLink === "view-products"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to={"/dropper/offers"}
                        className={
                            activeLink === "view-offers"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Offers
                    </NavLink>
                    <NavLink
                        to={"/dropper/campaigns"}
                        className={
                            activeLink === "view-campaigns"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Campaigns
                    </NavLink>
                    <NavLink
                        to={"/dropper/drops"}
                        className={
                            activeLink === "view-drops"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Drops
                    </NavLink>
                    <NavLink
                        to={"/dropper/users"}
                        className={
                            activeLink === "view-users"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Users
                    </NavLink>
                    <NavLink
                        to={"/dropper/roles"}
                        className={
                            activeLink === "view-roles"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Roles
                    </NavLink>
                    <NavLink
                        to={"/dropper/developer/console"}
                        className={
                            activeLink === "view-developer-console"
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        Developer Console
                    </NavLink>
                </div>
                <div className={styles.main}>{children}</div>
            </div>
        </div>
    );
}
