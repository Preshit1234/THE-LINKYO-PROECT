import thiscss from "./css/usercard.module.css";
import styles from "./css/DropCard.module.css";
import { importAll } from "./js/import-data";

export default function userCard() {
    const images = importAll(
        require.context("../assets/images/", false, /\.(png|jpe?g|svg)$/)
    );
    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    return (
        <>
            <div className={thiscss.wholeUserCard}>
                <div className={thiscss.ParentCard}>
                    <img
                        id={thiscss.profilePicId}
                        src={images["dummyprofilepic.png"]}
                        alt=""
                    />
                    <div className={thiscss.TitleClass}>
                        <div className={thiscss.Title}> Patrick Batemen </div>
                        <div className={thiscss.Role}>
                            {" "}
                            Vice President, Pierce & Pierce
                        </div>
                    </div>
                    <div className={thiscss.TagDiv}>
                        <span className={styles.pTags}>Writing</span>
                        <span className={styles.pTags}>Edtech</span>
                        <span className={styles.pTags}>Gen AI</span>
                        <span className={styles.pTags}>ML Modelling</span>
                    </div>
                    <hr className={thiscss.HrTag} />
                    <div className={thiscss.subTitle}>
                        Successful promotions
                    </div>
                    <div className={thiscss.promotionPicClass}>
                        <img
                            className={thiscss.promotionpic}
                            src={images["Framethumbnail-zywa.png"]}
                            alt="i1"
                        />
                        <img
                            className={thiscss.promotionpic}
                            src={images["Framethumbnail-coca.png"]}
                            alt="i2"
                        />
                        <img
                            className={thiscss.promotionpic}
                            src={images["Framethumbnail-kippo.png"]}
                            alt="i3"
                        />
                        <img
                            className={thiscss.promotionpic}
                            src={images["Framethumbnail-zocket.png"]}
                            alt="i4"
                        />
                    </div>
                    <hr className={thiscss.HrTag} />
                    <div className={thiscss.subTitle}>Followers</div>
                    <div className={thiscss.socialsCountComponent}>
                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-linkedin.svg"]}
                                alt="i5"
                            />
                            <div className={thiscss.followersCount}>122k</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-insta.svg"]}
                                alt="i6"
                            />
                            <div className={thiscss.followersCount}>1.3M</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-x.svg"]}
                                alt="i7"
                            />
                            <div className={thiscss.followersCount}>475k</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-youtube.svg"]}
                                alt="i8"
                            />
                            <div className={thiscss.followersCount}>879K</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-reddit.svg"]}
                                alt="i9"
                            />
                            <div className={thiscss.followersCount}>65k</div>
                        </div>
                    </div>
                </div>
                <div className={thiscss.CTAs}>
                    <button className={thiscss.ReqPartnershipBtn}>
                        Request Partnership
                    </button>
                    <button className={thiscss.ViewProfileBtn}>
                        View Profile
                    </button>
                </div>
            </div>
        </>
    );
}
