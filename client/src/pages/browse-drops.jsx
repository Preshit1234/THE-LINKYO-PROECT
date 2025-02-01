// Begin
import "./css/browse-drops.css";
import styles from "./css/BrowseDrops.module.css";
import MultipleDropCards from "../components/multiple-drop-cards.jsx";
import { useState, useEffect, memo } from "react";
import Header from "../components/header.jsx";
// import { importAll } from "../components/js/import-data.js";
import Sidebar from "../components/sidebar.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import TogglePaid from "./testDropperpage/browsedroppaid";
import axios from "axios";
import List from "../components/testListComponent/test-list-component";
import DefList from "../components/testListComponent/default-list-component";
import { Icon } from "@iconify/react";

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
const BrowseDrops = memo(function BrowseDrops({ type }) {
    const [categoryTags, setCategoryTags] = useState([]);
    const { user } = useUser();
    const [lists, setLists] = useState([]);
    const [tags, setTags] = useState([null]);
    const [newDrops, setNewDrops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `${
                        process.env.REACT_APP_BACKEND_URL
                    }/api/dropper/lists/getlists${type ? "?type=" + type : ""}${
                        tags ? "?tags=" + tags : ""
                    }`,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWI5ZDQxZWVhODJkZTZkZWE1ZTlhMCIsImlhdCI6MTczODI1MTY4MSwiZXhwIjoxNzM4NjgzNjgxfQ.ofwJ_raJk8kGTU4FekSHncPs1KTGaiSQ3CjhJJW6XRw",
                        },
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, tags]);

    useEffect(() => {
        const fetchNewDrops = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/dropper/lists/defaultlist`,
                    {
                        headers: {
                            token: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    }
                );
                setNewDrops(response.data);
            } catch (error) {
                console.error("Error fetching new products:", error);
            }
        };
        fetchNewDrops();
    }, []);

    useEffect(() => {
        if (lists.length > 0 && newDrops.length > 0) setIsLoading(false);
    }, [lists, newDrops]);

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
                {isLoading ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // height: "100%",
                            width: "100%",
                            padding: "100px",
                        }}
                    >
                        <Icon
                            icon="svg-spinners:3-dots-scale"
                            width="100"
                            height="100"
                        />
                    </div>
                ) : (
                    <>
                        <div className={styles.categoryWrapper}>
                            <div
                                id="category-tags-container"
                                className={styles.categoryContainer}
                            >
                                <div
                                    className={
                                        "category-tags " + styles.activeTag
                                    }
                                >
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
                            <TogglePaid typePaid={type} />

                            {lists.map((list, index) => (
                                <List list={list} key={index} />
                            ))}

                            <DefList deflist={newDrops} />

                            {/* <div>
                        <h2>Newly Added Products</h2>
                        <div className="product-list">
                            {newDrops.length > 9 ? (
                            newDrops.map((product) => (
                                <div key={product._id} className="product-card">
                                <h3>{product.product_name}</h3>
                                <p>{product.short_desc}</p>
                                <img src={product.productImg} alt={product.product_name} width="150px" />
                                </div>
                            ))
                            ) : (
                            <p>No new products available.</p>
                            )}
                        </div>
                    </div> */}

                            {/* <div id="drops-type-1" className="drops-types">
                        <p className="drops-type-text">Top products dropped recently</p>
                        <MultipleDropCards />
                    </div>
                    <div id="drops-type-2" className="drops-types">
                        <p className="drops-type-text">Products with high {APP_NAME} Score</p>
                        <MultipleDropCards />
                    </div> */}
                            <div id="drops-type-2" className="drops-types">
                                {/* <MultipleDropCards /> */}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

export default BrowseDrops;
