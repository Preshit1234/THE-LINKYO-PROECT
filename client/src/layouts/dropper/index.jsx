import styles from "./index.module.css";
import Header from "../../components/header";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useMember } from "../../contexts/MemberContext";
import { useState } from "react";
import { importAssets } from "../../components/js/import-data";

export default function DropperLayout() {
    // const { member } = useMember(); //nantar kadh
    const svgs = importAssets('svgs');
    const navigate = useNavigate();
    const {member, setMember} = useMember();
    const handleBackToMainAccount = async (e) => {
        e.preventDefault();

        localStorage.removeItem("memberAccessToken");
        setMember(null);
        navigate("/user/home");
    };

    return (
        <div className={styles.container}>
            {/* <Header type="memberLogin" member={member} /> */}
            <div className={styles.body}>
                <div className={styles.sidebar}>
                    <div className={styles.orgName}>
                        <div className={styles.orgProfilePic}>
                            {/* {!!member ? member.organisationPic : ""} */}
                        </div>
                        <span class={styles.orgSpanStyles }>
                            {!!member ? member.organization.name : ""}
                        </span>
                    </div>
                    <div className={styles.navDropsLinkContainer}> 
                        <div className={styles.navDropsLink}>
                        <NavLink
                            exact="true"
                            to={"/dropper/dashboard"}
                            className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                            }
                        >
                            Dashboard
                        </NavLink>
                        {/* <NavLink
                            exact="true"
                            to={"/dropper/products"}
                            className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                            }
                        >
                        Products
                        </NavLink>
                        <NavLink
                            exact="true"
                            to={"/dropper/offers"}
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.inactiveLink
                            }
                        >
                            Offers
                        </NavLink>
                        <NavLink
                            exact="true"
                            to={"/dropper/campaigns"}
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.inactiveLink
                            }
                        >
                            Campaigns
                        </NavLink> */}
                        <NavLink
                            exact="true"
                            to={"/dropper/drops"}
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.inactiveLink
                            }
                        >
                            Drops
                        </NavLink>
                        <NavLink
                            exact="true"
                            to={"/dropper/users"}
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.inactiveLink
                            }
                        >
                            Users
                        </NavLink>
                        <NavLink
                            exact="true"
                            to={"/dropper/roles"}
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.inactiveLink
                            }
                        >
                            Roles
                        </NavLink>
                        <NavLink
                            exact="true"
                            to={"/dropper/developer/console"}
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.inactiveLink
                            }
                            >
                            Developer Console
                        </NavLink>

                        </div>
                        <div className={styles.switchBack}>
                            <NavLink
                                to="/user/home"
                                className={styles.backToMainAccount}
                                onClick={handleBackToMainAccount}
                            >
                                Back to Main Account
                            </NavLink>
                        </div>
                    </div>
                    <div style={{ flexGrow: "1" }} />
                    <div className={styles.linkyoLogo}>
                        <img src={svgs["app-logo.svg"]} alt="Linkyo logo"/> 
                        <span className={ styles.linkyoLogoTextSpan }>
                            {process.env.REACT_APP_NAME}
                        </span>
                    </div>
                </div>
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
