import styles from "./index.module.css";
import Header from "../../components/header";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useMember } from "../../contexts/MemberContext";

export default function DropperLayout() {
    const { member } = useMember();

    return (
        <div className={styles.container}>
            <Header type="memberLogin" member={member} />
            <div className={styles.body}>
                <div className={styles.sidebar}>
                    <NavLink
                        exact
                        to={"/dropper/dashboard"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        exact
                        to={"/dropper/products"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to={"/dropper/offers"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Offers
                    </NavLink>
                    <NavLink
                        to={"/dropper/campaigns"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Campaigns
                    </NavLink>
                    <NavLink
                        to={"/dropper/drops"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Drops
                    </NavLink>
                    <NavLink
                        to={"/dropper/users"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Users
                    </NavLink>
                    <NavLink
                        to={"/dropper/roles"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Roles
                    </NavLink>
                    <NavLink
                        to={"/dropper/developer/console"}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        Developer Console
                    </NavLink>
                </div>
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
