// Begin
import "./css/browse-drops.css";
import styles from "./css/BrowseDrops.module.css";
import MultipleDropCards from "../components/multiple-drop-cards.jsx";
import { useState } from "react";
import Header from "../components/header.jsx";
// import { importAll } from "../components/js/import-data.js";
import Sidebar from "../components/sidebar.jsx";
import { useUser } from "../contexts/UserContext.jsx";

// Mock API response data
const categoryTagsList = [
    "Writing",
    "EdTech",
    "Gen AI",
    "ML Modelling",
    "Writing",
    "EdTech",
    "Gen AI",
    "ML Modelling",
    "Writing",
    "EdTech",
    "Gen AI",
    "ML Modelling",
];

/**
 * A react component that renders the browse drops page.
 * @returns {ReactNode}
 */
export default function BrowseDrops() {
    const [categoryTags, setCategoryTags] = useState([]);
    const { user } = useUser();

    // Initializing with mock data
    if (categoryTags.length < 1) {
        setCategoryTags(categoryTagsList);
    }

    let cpyCategoryTags = [...categoryTags];
    // let svgs = importAll(
    //     require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    // );

    return (
        <div className={styles.container}>
            <Header
                type={!!user ? "login" : ""}
                userData={!!user ? user : ""}
            />
            {/* <Header type="login" /> */}
            <Sidebar />
            <div id="browse-drops-container">
                <div className={styles.categoryWrapper}>
                    <div
                        id="category-tags-container"
                        className={styles.categoryContainer}
                    >
                        <div className={"category-tags " + styles.activeTag}>
                            All
                        </div>
                        {cpyCategoryTags.map((ct, index) => (
                            <div className="category-tags" key={index}>
                                {ct}
                            </div>
                        ))}
                    </div>
                </div>
                <div id="drops-container">
                    {/* <div id="drops-type-1" className="drops-types">
                        <p className="drops-type-text">Top products dropped recently</p>
                        <MultipleDropCards />
                    </div>
                    <div id="drops-type-2" className="drops-types">
                        <p className="drops-type-text">Products with high {APP_NAME} Score</p>
                        <MultipleDropCards />
                    </div> */}
                    <div id="drops-type-2" className="drops-types">
                        <MultipleDropCards />
                    </div>
                </div>
            </div>
        </div>
    );
}
