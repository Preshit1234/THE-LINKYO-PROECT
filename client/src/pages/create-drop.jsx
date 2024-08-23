import gsap from "gsap";
import "./css/create-drop.css";
import { useGSAP } from "@gsap/react";
import Header from "../components/header";
import DropCard from "../components/drop-card";
import { importAll } from "../components/js/import-data";
import { useState, useEffect, useRef } from "react";

/**
 * A dummy api response for rendering drop card component.
 */
const dummyDrop = {
    id: 3,
    name: "CoCA",
    publisher: "Alok",
    is_publisher_verified: "n",
    description: "The world's first MPC wallet with non-custodial card.",
    thumbnail_url: "Framethumbnail-coca.png",
    product_url: "",
    score: "130",
    tags: ["Fintech", "Finance", "Blockchain"],
};

/**
 * A react component that renders the create drop page.
 * @returns {ReactNode}
 */
const CreateDrop = () => {
    const [subformStage, setSubformStage] = useState(1);
    const [subformFieldsetStage, setSubformFieldsetStage] = useState(1);

    /**
     * Contains all svgs from assets/svgs/ folder
     */
    const svgs = importAll(
        require.context("../assets/svgs/", false, /.(png|jpe?g|svg)$/)
    );

    // For gsap
    gsap.registerPlugin(useGSAP);
    const mainDisplayContainer = useRef();
    const createDropForm = useRef();
    // const { contextSafe } = useGSAP({ scope: createDropForm });
    const { contextSafe } = useGSAP();

    console.log("subformStage: " + subformStage);
    console.log("subformFieldsetStage: " + subformFieldsetStage);

    // Animations on mount
    useGSAP(
        () => {
            if (subformStage === 1) {
                gsap.fromTo(
                    "#create-drop-subform-1-container",
                    { y: 100 },
                    {
                        display: "flex",
                        alpha: "1",
                        ease: "back.inOut(1.4)",
                        y: 0,
                        duration: 0.5,
                    }
                );
            } else if (subformStage === 2) {
                // gsap.set("#create-drop-form-subform-2-fieldset-1", { display: "none", alpha: 0 });
                for (let i = 1; i <= 5; i++) {
                    if (i === subformFieldsetStage) {
                        gsap.to("#create-drop-form-subform-2-fieldset-" + i, {
                            display: "flex",
                            alpha: 1,
                        });
                        console.log(
                            "#create-drop-form-subform-2-fieldset-" +
                                i +
                                " matches"
                        );
                    } else {
                        gsap.to("#create-drop-form-subform-2-fieldset-" + i, {
                            display: "none",
                            alpha: 0,
                        });
                        console.log(
                            "#create-drop-form-subform-2-fieldset-" +
                                i +
                                " does not match"
                        );
                    }
                }
                gsap.fromTo(
                    "#create-drop-form-main-display-container",
                    { y: 250 },
                    {
                        display: "flex",
                        alpha: "1",
                        ease: "back.inOut(1.4)",
                        y: 0,
                        duration: 1,
                    }
                );
            }
        },
        {
            scope: createDropForm,
        }
    );

    useEffect(() => {}, []);

    const handleGetStarted = contextSafe((e) => {
        e.preventDefault();
        console.log("clicked Get Started");
        // validateURL()
        // if url is valid then
        // contextSafe(() => {
        //     gsap.to("#create-drop-subform-1-container", { y: 100, alpha: 0, ease: "back.inOut(1.4)", duration: 0.5 });
        // });
        let timeline = gsap.timeline();
        timeline
            .to("#create-drop-subform-1-container", {
                y: 100,
                alpha: 0,
                ease: "back.inOut(1.4)",
                duration: 0.5,
            })
            .to("#create-drop-subform-1-container", {
                display: "none",
                duration: 0,
                onComplete: () => {
                    setSubformStage(2);
                },
            })
            .to("#create-drop-form-subform-2-fieldset-1", {
                display: "flex",
                alpha: 1,
                duration: 0,
            })
            .to("#breadcrumbs-circle-point-outer-circle-1", {
                borderColor: "#0969DA",
                duration: 0,
            })
            .to("#breadcrumbs-circle-point-inner-circle-1", {
                backgroundColor: "#0969DA",
                duration: 0,
            })
            .fromTo(
                "#create-drop-form-main-display-container",
                {
                    y: 100,
                    display: "none",
                    alpha: 0,
                },
                {
                    display: "flex",
                    alpha: "1",
                    ease: "back.inOut(1.4)",
                    y: 0,
                    duration: 0.5,
                }
            );
    });

    const proceedToStage2 = contextSafe((e) => {
        e.preventDefault();
        let timeline = gsap.timeline();
        timeline
            .to("#create-drop-form-subform-2-fieldset-1", {
                x: -50,
                alpha: 0,
                ease: "back.inOut(1.4)",
                duration: 0.5,
            })
            .to("#create-drop-form-subform-2-fieldset-1", {
                display: "none",
                onComplete: () => {
                    setSubformFieldsetStage(2);
                },
            })
            .to("#breadcrumbs-circle-point-inner-circle-1", {
                height: 0,
                width: 0,
                duration: 0.1,
            })
            .fromTo(
                "#breadcrumbs-check-1",
                {
                    height: 0,
                    width: 0,
                    display: "flex",
                },
                {
                    height: "32px",
                    width: "32px",
                    duration: 0.2,
                }
            )
            .fromTo(
                "#breadcrumbs-connector-1",
                {
                    background:
                        "linear-gradient(to right, #0969DA 0%, #9CA3AF 0%)",
                },
                {
                    background:
                        "linear-gradient(to right, #0969DA 100%, #9CA3AF 100%)",
                    duration: 0.1,
                }
            )
            .to("#breadcrumbs-circle-point-outer-circle-2", {
                borderColor: "#0969DA",
                duration: 0.1,
            })
            .to("#breadcrumbs-circle-point-inner-circle-2", {
                backgroundColor: "#0969DA",
                duration: 0.1,
            })
            .fromTo(
                "#create-drop-form-subform-2-fieldset-2",
                {
                    x: 50,
                    alpha: 0,
                    display: "none",
                },
                {
                    display: "flex",
                    x: 0,
                    alpha: 1,
                    ease: "back.inOut(1.4)",
                    duration: 0.5,
                }
            );
    });

    const proceedToStage3 = contextSafe((e) => {
        e.preventDefault();
        let timeline = gsap.timeline();
        timeline
            .to("#create-drop-form-subform-2-fieldset-2", {
                x: -50,
                alpha: 0,
                ease: "back.inOut(1.4)",
                duration: 0.5,
            })
            .to("#create-drop-form-subform-2-fieldset-2", {
                display: "none",
                onComplete: () => {
                    setSubformFieldsetStage(3);
                },
            })
            .to("#breadcrumbs-circle-point-inner-circle-2", {
                height: 0,
                width: 0,
                duration: 0.1,
            })
            .fromTo(
                "#breadcrumbs-check-2",
                {
                    height: 0,
                    width: 0,
                    display: "flex",
                },
                {
                    height: "32px",
                    width: "32px",
                    duration: 0.2,
                }
            )
            .fromTo(
                "#breadcrumbs-connector-2",
                {
                    background:
                        "linear-gradient(to right, #0969DA 0%, #9CA3AF 0%)",
                },
                {
                    background:
                        "linear-gradient(to right, #0969DA 100%, #9CA3AF 100%)",
                    duration: 0.1,
                }
            )
            .to("#breadcrumbs-circle-point-outer-circle-3", {
                borderColor: "#0969DA",
                duration: 0.1,
            })
            .to("#breadcrumbs-circle-point-inner-circle-3", {
                backgroundColor: "#0969DA",
                duration: 0.1,
            })
            .fromTo(
                "#create-drop-form-subform-2-fieldset-3",
                {
                    x: 50,
                    alpha: 0,
                    display: "none",
                },
                {
                    display: "flex",
                    x: 0,
                    alpha: 1,
                    ease: "back.inOut(1.4)",
                    duration: 0.5,
                }
            );
    });

    const proceedToStage4 = contextSafe((e) => {
        e.preventDefault();
        let timeline = gsap.timeline();
        timeline
            .to("#create-drop-form-subform-2-fieldset-3", {
                x: -50,
                alpha: 0,
                ease: "back.inOut(1.4)",
                duration: 0.5,
            })
            .to("#create-drop-form-subform-2-fieldset-3", {
                display: "none",
                onComplete: () => {
                    setSubformFieldsetStage(4);
                },
            })
            .to("#breadcrumbs-circle-point-inner-circle-3", {
                height: 0,
                width: 0,
                duration: 0.1,
            })
            .fromTo(
                "#breadcrumbs-check-3",
                {
                    height: 0,
                    width: 0,
                    display: "flex",
                },
                {
                    height: "32px",
                    width: "32px",
                    duration: 0.2,
                }
            )
            .fromTo(
                "#breadcrumbs-connector-3",
                {
                    background:
                        "linear-gradient(to right, #0969DA 0%, #9CA3AF 0%)",
                },
                {
                    background:
                        "linear-gradient(to right, #0969DA 100%, #9CA3AF 100%)",
                    duration: 0.1,
                }
            )
            .to("#breadcrumbs-circle-point-outer-circle-4", {
                borderColor: "#0969DA",
                duration: 0.1,
            })
            .to("#breadcrumbs-circle-point-inner-circle-4", {
                backgroundColor: "#0969DA",
                duration: 0.1,
            })
            .fromTo(
                "#create-drop-form-subform-2-fieldset-4",
                {
                    x: 50,
                    alpha: 0,
                    display: "none",
                },
                {
                    display: "flex",
                    x: 0,
                    alpha: 1,
                    ease: "back.inOut(1.4)",
                    duration: 0.5,
                }
            );
    });

    const proceedToStage5 = contextSafe((e) => {
        e.preventDefault();
        let timeline = gsap.timeline();
        timeline
            .to("#create-drop-form-subform-2-fieldset-4", {
                x: -50,
                alpha: 0,
                ease: "back.inOut(1.4)",
                duration: 0.5,
            })
            .to("#create-drop-form-subform-2-fieldset-4", {
                display: "none",
                onComplete: () => {
                    setSubformFieldsetStage(5);
                },
            })
            .to("#breadcrumbs-circle-point-inner-circle-4", {
                height: 0,
                width: 0,
                duration: 0.1,
            })
            .fromTo(
                "#breadcrumbs-check-4",
                {
                    height: 0,
                    width: 0,
                    display: "flex",
                },
                {
                    height: "32px",
                    width: "32px",
                    duration: 0.2,
                }
            )
            .fromTo(
                "#breadcrumbs-connector-4",
                {
                    background:
                        "linear-gradient(to right, #0969DA 0%, #9CA3AF 0%)",
                },
                {
                    background:
                        "linear-gradient(to right, #0969DA 100%, #9CA3AF 100%)",
                    duration: 0.1,
                }
            )
            .to("#breadcrumbs-circle-point-outer-circle-5", {
                borderColor: "#0969DA",
                duration: 0.1,
            })
            .to("#breadcrumbs-circle-point-inner-circle-5", {
                backgroundColor: "#0969DA",
                duration: 0.1,
            })
            .fromTo(
                "#create-drop-form-subform-2-fieldset-5",
                {
                    x: 50,
                    alpha: 0,
                    display: "none",
                },
                {
                    display: "flex",
                    x: 0,
                    alpha: 1,
                    ease: "back.inOut(1.4)",
                    duration: 0.5,
                }
            );
    });

    return (
        <div id="create-drop-container">
            <Header type="login" />
            <div id="create-drop-content">
                <p id="create-drop-tagline-1">
                    Drop Your Product and reach out to Millions.
                </p>
                <p id="create-drop-tagline-2">
                    Step into the spotlight and unveil your ingenious creation
                    to the world! Whether you've stumbled upon a game-changing
                    gadget or crafted a product with your own hands, it's time
                    to let the universe know. This is your moment to shine, to
                    share your brilliance with eager minds and curious souls.{" "}
                    <br />
                    <br />
                </p>
                <form
                    action=""
                    method=""
                    id="create-drop-form"
                    ref={createDropForm}
                >
                    <div id="create-drop-subform-1-container">
                        <div id="create-drop-subform-1">
                            <input
                                type="text"
                                name="productInitialUrl"
                                id="create-drop-subform-1-input"
                                placeholder="Enter Product URL if any"
                            />
                            <button
                                id="create-drop-subform-1-get-started-button"
                                onClick={handleGetStarted}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div
                        id="create-drop-form-main-display-container"
                        ref={mainDisplayContainer}
                    >
                        <div id="create-drop-form-main-form-display">
                            <div id="create-drop-form-main-form-display-header">
                                <span>Editor</span>
                            </div>
                            <hr className="createDrop" />
                            <div id="create-drop-form-main-form-display-body">
                                <div id="create-drop-form-main-form-display-body-sections">
                                    {/* <span className="active">1. About <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                    <span className="">2. Add Assets <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                    <span className="">3. Add Owners <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                    <span className="">4. Add Offer <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                    <span className="">5. Drop <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span> */}
                                    <div className="breadcrumbs-navigation">
                                        {/* About */}
                                        <div
                                            className="breadcrumbs-navigation-node"
                                            id="breadcrumbs-navigation-node-1"
                                        >
                                            <div className="breadcrumbs-navigation-node-label-container">
                                                <span className="breadcrumbs-navigation-node-label">
                                                    About
                                                </span>
                                            </div>
                                            <div
                                                className="breadcrumb-outer-circle"
                                                id="breadcrumbs-circle-point-outer-circle-1"
                                            >
                                                <div
                                                    className="breadcrumb-inner-circle"
                                                    id="breadcrumbs-circle-point-inner-circle-1"
                                                ></div>
                                                <div
                                                    className="breadcrumb-check-container"
                                                    id="breadcrumbs-check-1"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                        className="breadcrumb-check"
                                                    >
                                                        {/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                                                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connector */}
                                        <div
                                            className="breadcrumbs-connector"
                                            id="breadcrumbs-connector-1"
                                        ></div>

                                        {/* Add Assets */}
                                        <div
                                            className="breadcrumbs-navigation-node"
                                            id="breadcrumbs-navigation-node-2"
                                        >
                                            <div className="breadcrumbs-navigation-node-label-container">
                                                <span className="breadcrumbs-navigation-node-label">
                                                    Add Assets
                                                </span>
                                            </div>
                                            <div
                                                className="breadcrumb-outer-circle"
                                                id="breadcrumbs-circle-point-outer-circle-2"
                                            >
                                                <div
                                                    className="breadcrumb-inner-circle"
                                                    id="breadcrumbs-circle-point-inner-circle-2"
                                                ></div>
                                                <div
                                                    className="breadcrumb-check-container"
                                                    id="breadcrumbs-check-2"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                        className="breadcrumb-check"
                                                    >
                                                        {/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                                                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connector */}
                                        <div
                                            className="breadcrumbs-connector"
                                            id="breadcrumbs-connector-2"
                                        ></div>

                                        {/* Add Owners */}
                                        <div
                                            className="breadcrumbs-navigation-node"
                                            id="breadcrumbs-navigation-node-3"
                                        >
                                            <div className="breadcrumbs-navigation-node-label-container">
                                                <span className="breadcrumbs-navigation-node-label">
                                                    Add Owners
                                                </span>
                                            </div>
                                            <div
                                                className="breadcrumb-outer-circle"
                                                id="breadcrumbs-circle-point-outer-circle-3"
                                            >
                                                <div
                                                    className="breadcrumb-inner-circle"
                                                    id="breadcrumbs-circle-point-inner-circle-3"
                                                ></div>
                                                <div
                                                    className="breadcrumb-check-container"
                                                    id="breadcrumbs-check-3"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                        className="breadcrumb-check"
                                                    >
                                                        {/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                                                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connector */}
                                        <div
                                            className="breadcrumbs-connector"
                                            id="breadcrumbs-connector-3"
                                        ></div>

                                        {/* Add Offer */}
                                        <div
                                            className="breadcrumbs-navigation-node"
                                            id="breadcrumbs-navigation-node-4"
                                        >
                                            <div className="breadcrumbs-navigation-node-label-container">
                                                <span className="breadcrumbs-navigation-node-label">
                                                    Add Offer
                                                </span>
                                            </div>
                                            <div
                                                className="breadcrumb-outer-circle"
                                                id="breadcrumbs-circle-point-outer-circle-4"
                                            >
                                                <div
                                                    className="breadcrumb-inner-circle"
                                                    id="breadcrumbs-circle-point-inner-circle-4"
                                                ></div>
                                                <div
                                                    className="breadcrumb-check-container"
                                                    id="breadcrumbs-check-4"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                        className="breadcrumb-check"
                                                    >
                                                        {/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                                                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connector */}
                                        <div
                                            className="breadcrumbs-connector"
                                            id="breadcrumbs-connector-4"
                                        ></div>

                                        {/* Drop */}
                                        <div
                                            className="breadcrumbs-navigation-node"
                                            id="breadcrumbs-navigation-node-5"
                                        >
                                            <div className="breadcrumbs-navigation-node-label-container">
                                                <span className="breadcrumbs-navigation-node-label">
                                                    Drop
                                                </span>
                                            </div>
                                            <div
                                                className="breadcrumb-outer-circle"
                                                id="breadcrumbs-circle-point-outer-circle-5"
                                            >
                                                <div
                                                    className="breadcrumb-inner-circle"
                                                    id="breadcrumbs-circle-point-inner-circle-5"
                                                ></div>
                                                <div
                                                    className="breadcrumb-check-container"
                                                    id="breadcrumbs-check-5"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                        className="breadcrumb-check"
                                                    >
                                                        {/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                                                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="create-drop-form-subform-2"
                                    className="create-drop-form-subforms"
                                >
                                    <fieldset
                                        id="create-drop-form-subform-2-fieldset-1"
                                        className="create-drop-form-subform-2-fieldset"
                                    >
                                        <div id="create-drop-form-subform-2-body-text-1">
                                            <p className="subform-title">
                                                First Tell us more about this
                                                product
                                            </p>
                                            <p className="subform-description">
                                                We'll need it's name, tagline,
                                                links, tags and description.
                                            </p>
                                        </div>

                                        <div className="create-drop-form-subform-2-inputs-container">
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="productUrl"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    URL
                                                </label>
                                                <input
                                                    type="text"
                                                    name="productUrl"
                                                    id=""
                                                    placeholder="Enter Product URL if any"
                                                    className="create-drop-form-text-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="productName"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Name of the Product
                                                </label>
                                                <input
                                                    type="text"
                                                    name="productName"
                                                    id=""
                                                    placeholder="Enter Name"
                                                    className="create-drop-form-text-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="productDescription"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    name="productDesctiption"
                                                    id=""
                                                    rows="6"
                                                    placeholder="Describe your product"
                                                    className="create-drop-form-textarea-inputs"
                                                ></textarea>
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="tagline"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Add Tagline
                                                </label>
                                                <input
                                                    type="text"
                                                    name="tagline"
                                                    id=""
                                                    placeholder="Enter a catchy tagline"
                                                    className="create-drop-form-text-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="tags"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Add Tags
                                                </label>
                                                <input
                                                    type="text"
                                                    name="tags"
                                                    id=""
                                                    placeholder="Enter Tags"
                                                    className="create-drop-form-text-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-navigation-buttons-container">
                                                <button
                                                    className="create-drop-form-navigation-next-subform-buttons next"
                                                    onClick={proceedToStage2}
                                                >
                                                    Continue to Add assets
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset
                                        id="create-drop-form-subform-2-fieldset-2"
                                        className="create-drop-form-subform-2-fieldset"
                                    >
                                        <div id="create-drop-form-subform-2-body-text-2">
                                            <p className="subform-title">
                                                Great, Now Make it more reliable
                                            </p>
                                            <p className="subform-description">
                                                Draw fetchers attention by
                                                adding related Thumbnail and a
                                                Cover Image.
                                            </p>
                                        </div>

                                        <div className="create-drop-form-subform-2-inputs-container">
                                            <div className="create-drop-form-input-fields-container">
                                                <span className="create-drop-form-input-field-labels">
                                                    Add Thumbnail
                                                </span>
                                                <label className="create-drop-form-file-input-containers">
                                                    <input
                                                        type="text"
                                                        name="productThumbnail"
                                                        className="create-drop-form-file-inputs"
                                                        id=""
                                                        placeholder="Select Image file to upload"
                                                    />
                                                    <img
                                                        src={
                                                            svgs[
                                                                "solar-upload-linear.svg"
                                                            ]
                                                        }
                                                        alt="upload icon"
                                                    />
                                                    <span>
                                                        Select Image file to
                                                        upload
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <span className="create-drop-form-input-field-labels">
                                                    Add Related Images
                                                </span>
                                                <label className="create-drop-form-file-input-containers">
                                                    <input
                                                        type="text"
                                                        name="productThumbnail"
                                                        className="create-drop-form-file-inputs"
                                                        id=""
                                                        placeholder="Select Image file to upload"
                                                    />
                                                    <img
                                                        src={
                                                            svgs[
                                                                "solar-upload-linear.svg"
                                                            ]
                                                        }
                                                        alt="upload icon"
                                                    />
                                                    <span>
                                                        Select Image file to
                                                        upload
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="create-drop-form-navigation-buttons-container">
                                                <button
                                                    className="create-drop-form-navigation-next-subform-buttons next"
                                                    onClick={proceedToStage3}
                                                >
                                                    Next - Add Owners
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset
                                        id="create-drop-form-subform-2-fieldset-3"
                                        className="create-drop-form-subform-2-fieldset"
                                    >
                                        <div id="create-drop-form-subform-2-body-text-3">
                                            <p className="subform-title">
                                                Almost There, Now Assign owners
                                                to assets for clear
                                                accountability.
                                            </p>
                                            <p className="subform-description">
                                                Uploaded Products must be
                                                authenticated with
                                                Organization's Email, Yes.
                                            </p>
                                        </div>

                                        <div className="create-drop-form-subform-2-inputs-container">
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="ownerName"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Name of the owner
                                                </label>
                                                <input
                                                    type="text"
                                                    name="ownerName"
                                                    id=""
                                                    placeholder="Enter Name"
                                                    className="create-drop-form-text-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="orgEmail"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Organizations's email
                                                </label>
                                                <input
                                                    type="text"
                                                    name="orgEmail"
                                                    id=""
                                                    placeholder="Enter email"
                                                    className="create-drop-form-text-inputs"
                                                />
                                                <div
                                                    className="create-drop-form-button"
                                                    id="create-drop-form-verify-email-button"
                                                >
                                                    Verify
                                                </div>
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="pin"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Pin
                                                </label>
                                                <div className="create-drop-form-pin-inputs-container">
                                                    <input
                                                        type="number"
                                                        name="pin"
                                                        id=""
                                                        placeholder=""
                                                        className="create-drop-form-pin-inputs"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="pin"
                                                        id=""
                                                        placeholder=""
                                                        className="create-drop-form-pin-inputs"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="pin"
                                                        id=""
                                                        placeholder=""
                                                        className="create-drop-form-pin-inputs"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="pin"
                                                        id=""
                                                        placeholder=""
                                                        className="create-drop-form-pin-inputs"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="pin"
                                                        id=""
                                                        placeholder=""
                                                        className="create-drop-form-pin-inputs"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="pin"
                                                        id=""
                                                        placeholder=""
                                                        className="create-drop-form-pin-inputs"
                                                    />
                                                </div>
                                            </div>
                                            <div className="create-drop-form-navigation-buttons-container">
                                                <button
                                                    className="create-drop-form-navigation-next-subform-buttons next"
                                                    onClick={proceedToStage4}
                                                >
                                                    Continue to Add Offers
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset
                                        id="create-drop-form-subform-2-fieldset-4"
                                        className="create-drop-form-subform-2-fieldset"
                                    >
                                        <div id="create-drop-form-subform-2-body-text-4">
                                            <p className="subform-title">
                                                Well, Now add offer related to
                                                your product.
                                            </p>
                                            <p className="subform-description">
                                                How much percent of the
                                                commission is earned by
                                                affiliates for each conversion,
                                                visit, download, install, etc.
                                            </p>
                                        </div>

                                        <div className="create-drop-form-subform-2-inputs-container">
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="productPrice"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Product Price
                                                </label>
                                                <input
                                                    type="text"
                                                    name="productPrice"
                                                    id=""
                                                    placeholder="Enter Price at which the product will be sold."
                                                    className="create-drop-form-text-inputs"
                                                />

                                                <label
                                                    htmlFor="currency"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Choose currency
                                                </label>
                                                <select
                                                    name="currency"
                                                    id=""
                                                    className="create-drop-form-select-inputs"
                                                >
                                                    <option value="inr">
                                                        INR
                                                    </option>
                                                    <option value="dollar">
                                                        Dollar
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="commissionRate"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Commission Rate
                                                </label>
                                                <input
                                                    type="text"
                                                    name="commissionRate"
                                                    id=""
                                                    placeholder="The percentage of each sale that will be given to affiliates as commission."
                                                    className="create-drop-form-text-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="audienceDescription"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Target Audience
                                                </label>
                                                <textarea
                                                    name="audienceDesctiption"
                                                    id=""
                                                    rows="6"
                                                    placeholder="A brief description of the ideal audience for the product."
                                                    className="create-drop-form-textarea-inputs"
                                                ></textarea>
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="campaignDate"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Campaign Duration
                                                </label>
                                                <input
                                                    name="campaignDate"
                                                    id=""
                                                    className="create-drop-form-date-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-input-fields-container">
                                                <label
                                                    htmlFor="paymentInfo"
                                                    className="create-drop-form-input-field-labels"
                                                >
                                                    Payment Info
                                                </label>
                                                <input
                                                    type="text"
                                                    name="paymentInfo"
                                                    id=""
                                                    placeholder=""
                                                    className="create-drop-form-text-inputs"
                                                />
                                            </div>
                                            <div className="create-drop-form-navigation-buttons-container">
                                                <button
                                                    className="create-drop-form-navigation-next-subform-buttons next"
                                                    onClick={proceedToStage5}
                                                >
                                                    Next - Drop!
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset
                                        id="create-drop-form-subform-2-fieldset-5"
                                        className="create-drop-form-subform-2-fieldset"
                                    >
                                        <div id="create-drop-form-subform-2-body-text-5">
                                            <p className="subform-title">
                                                Last Stage
                                            </p>
                                            <p className="subform-description">
                                                Before you Drop, please verify
                                                whether you have missed
                                                something or posted incorrect
                                                information. If yes, make
                                                necessary changes. Once
                                                confirmed, proceed to Drop.
                                            </p>
                                        </div>

                                        <div className="create-drop-form-subform-2-inputs-container">
                                            <div className="create-drop-form-navigation-buttons-container">
                                                <button className="create-drop-form-navigation-next-subform-buttons next">
                                                    Publish the Drop
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                        <div id="create-drop-form-preview-display-container">
                            <div id="create-drop-form-preview-header">
                                <span id="create-drop-form-preview-text">
                                    Preview
                                </span>
                                <button
                                    type="submit"
                                    id="create-drop-form-submit-button"
                                >
                                    Drop!
                                </button>
                            </div>
                            <hr className="createDrop" />
                            <div id="create-drop-form-preview-body">
                                <DropCard drop={dummyDrop} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDrop;
