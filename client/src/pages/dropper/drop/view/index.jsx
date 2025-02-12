import { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

export default function DropperDropsPage() {
    const [drops, setDrops] = useState(null);

    useEffect(() => {
        async function getAllDrops() {
            if (drops === null) {
                console.log("Getting all drops");
                try {
                    let dropLists = await axios.get(
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
                    console.log(dropLists);
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
            <div></div>
        </div>
    );
}
