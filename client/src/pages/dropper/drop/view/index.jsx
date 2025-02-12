import { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { importAssets } from "../../../../components/js/import-data";

export default function DropperDropsPage() {
    const [drops, setDrops] = useState(null);
    const svgs = importAssets('svgs');

    useEffect(() => {
        async function getAllDrops() {
            if (drops === null) {
                try {
                    let res = await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL}/api/dropper/drop/all`,
                        {
                            headers: {
                                token: `Bearer ${localStorage.getItem(
                                    "accessToken"
                                )}`,
                                membertoken: `Bearer ${localStorage.getItem(
                                    "memberAccessToken"
                                )}`,
                            },
                        }
                    );
                    setDrops(res.data);
                } catch (err) {
                    console.log(
                        "Error: Error while importing organization drops"
                    );
                }
            }
        }
        getAllDrops();
    }, [drops]);

    return (
        <div className={styles.container}>
            Your Drops
            <div className={styles.dropsList}>
                {drops !== null &&
                    drops.map((drop) => {
                        return (
                            <div className={styles.drop}>
                                <span className={styles.dropTitle}>
                                    {drop.product_name}
                                </span>
                                <span className={styles.dropTagline}>
                                    {drop.tagline}
                                </span>
                            </div>
                        );
                    })}
                <NavLink
                    to="/dropper/drops/create"
                    className={styles.drop + " " + styles.createDropCard}
                >   <div className={styles.createdrops}></div>
                    <div className={styles.createdropslogo}>
                        <Icon icon="line-md:plus" width="42" height="42" />
                        <span>Create</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}
