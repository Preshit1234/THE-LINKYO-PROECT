import styles from "./css/ViewDrop.module.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { importAll } from "../components/js/import-data.js";

export default function ViewDrop() {
    const svgs = importAll(
        require.context("../assets/svgs/", false, /.(png|jpe?g|svg)$/)
    );
    const images = importAll(
        require.context("../assets/images/", false, /.(png|jpe?g|svg)$/)
    );
    return (
        <div className={styles.body}>
            <Header type="login" />
            <Sidebar />
            <div className={styles.pContainer}>
                <div className={styles.pHeader}>
                    <span className={styles.pName1}>COCA</span>
                    <div className={styles.div4}>
                        <div className={styles.div1}>
                            <div className={styles.div2}>
                                <span>Linkyo</span>
                                <span>Score</span>
                            </div>
                            <span className={styles.linkyoScore}>130%</span>
                        </div>
                        <button className={styles.bookmarkBtn}>
                            <img
                                className={styles.bookmarkBtnImg}
                                src={svgs["bookmark.svg"]}
                                alt="Bookmark Button"
                            />
                        </button>
                        <button className={styles.fetchLinkBtn}>
                            Fetch Link
                        </button>
                    </div>
                </div>
                <div className={styles.pBody}>
                    <div className={styles.pBanner}>
                        <img
                            className={styles.pBannerImage}
                            src={images["Framethumbnail-coca.png"]}
                            alt=""
                        />
                        <div className={styles.div5}>
                            <span className={styles.pName2}>COCA</span>
                            <p className={styles.pTitle}>
                                The world's first MPC wallet with non-custodial
                                card
                            </p>
                            <p className={styles.pSubtitle}>
                                The only self-custodial wallet with no private
                                key vulnerability, now with a debit card.
                                Empowered by MPC, always recoverable, never
                                hacked.
                            </p>
                        </div>
                        <div className={styles.pTagsContainer}>
                            <span className={styles.pTags}>Writing</span>
                            <span className={styles.pTags}>EdTech</span>
                            <span className={styles.pTags}>Gen AI</span>
                            <span className={styles.pTags}>ML Modelling</span>
                        </div>
                    </div>
                    <div className={styles.pCollage}>
                        <div className={styles.pCollageCol1}>
                            <img src={images["coca-1.png"]} alt="collageImg1" />
                        </div>
                        <div className={styles.pCollageCol2}>
                            <div>
                                <img
                                    src={images["coca-2.png"]}
                                    alt="collageImg2"
                                />
                            </div>
                            <div>
                                <img
                                    src={images["coca-3.png"]}
                                    alt="collageImg3"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.pSummary}>
                        <div className={styles.aInfo}>
                            <span className={styles.aName}>Ashton Martin</span>
                            <div className={styles.div3}>
                                <span className={styles.aDesignation}>
                                    Dropper
                                </span>
                                <img
                                    src={svgs["verification-tick.svg"]}
                                    alt="verification tick"
                                    className={styles.vTick}
                                />
                            </div>
                        </div>
                        <p className={styles.summaryText}>
                            Dive into a realm of innovation with our
                            groundbreaking fusion of MPC security and a
                            non-custodial debit card, a first in the industry.
                            This unique blend not only delivers unmatched safety
                            but also unfolds a realm of spending flexibility
                            right at your fingertips. With the assurance of a
                            never-hacked environment, COCA Wallet is not just a
                            wallet, it's your secure gateway to the financial
                            freedom that cryptocurrencies offer. Experience
                            seamless transactions, robust security, and ease of
                            mind knowing your assets are protected in a fortress
                            that stands unbreached.
                        </p>
                    </div>
                    <button className={styles.fetchLinkBtn}>Fetch Link</button>
                </div>
            </div>
            <div className={styles.sContainerWrapper}>
                <div className={styles.sContainer}>
                    <div className={styles.sHeader}>
                        <span>Stats</span>
                    </div>
                    <div className={styles.sBody}>
                        <div className={styles.sBodyElements}>
                            <span className={styles.sBodyElementsTitle}>
                                Fetchers
                            </span>
                            <span className={styles.sBodyElementsSubtitle}>
                                240
                            </span>
                        </div>
                        <div className={styles.sBodyElements}>
                            <span className={styles.sBodyElementsTitle}>
                                Earned
                            </span>
                            <span className={styles.sBodyElementsSubtitle}>
                                14249$
                            </span>
                        </div>
                        <div className={styles.sBodyElements}>
                            <span className={styles.sBodyElementsTitle}>
                                Conversions
                            </span>
                            <span className={styles.sBodyElementsSubtitle}>
                                4560
                            </span>
                        </div>
                        <div className={styles.sBodyElements}>
                            <span className={styles.sBodyElementsTitle}>
                                Weekly Ranking
                            </span>
                            <span className={styles.sBodyElementsSubtitle}>
                                03
                            </span>
                        </div>
                    </div>
                </div>
                <button className={styles.fetchLinkBtn}>Fetch Link</button>
            </div>
        </div>
    );
}
