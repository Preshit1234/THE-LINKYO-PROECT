import userListStyles from "./css/userlist.module.css";
import thiscss from "./css/usercard.module.css";
import styles from "./css/DropCard.module.css";
import { importAll } from "./js/import-data";

export default function UserList() {
    const images = importAll(
        require.context("../assets/images/", false, /\.(png|jpe?g|svg)$/)
    );
    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    return (
        <>
            <div className={userListStyles.ParentList}>
                <div className={userListStyles.ParentListLeft}>
                    <div className={userListStyles.ImgClass}>
                        <img
                            className={userListStyles.ProfilePic}
                            src={images["dummyprofilepic.png"]}
                            alt="i1"
                        />
                    </div>
                    <div className={userListStyles.TitleClass}>
                        <div className={userListStyles.Title}>
                            {" "}
                            Patrick Batemen{" "}
                        </div>
                        <div className={userListStyles.Role}>
                            {" "}
                            Vice President, Pierce & Pierce
                        </div>
                    </div>
                    <div className={userListStyles.TagDivList}>
                        <div className={thiscss.TagDiv}>
                            <span className={styles.pTags}>Writing</span>
                            <span className={styles.pTags}>Edtech</span>
                            <span className={styles.pTags}>Gen AI</span>
                            <span className={styles.pTags}>ML Modelling</span>
                        </div>
                    </div>
                </div>

                <div className={userListStyles.ParentListRight}>
                    <div className={thiscss.socialsCountComponent}>
                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-linkedin.svg"]}
                                alt="i2"
                            />
                            <div className={thiscss.followersCount}>122k</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-insta.svg"]}
                                alt="i3"
                            />
                            <div className={thiscss.followersCount}>1.3M</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-x.svg"]}
                                alt="i4"
                            />
                            <div className={thiscss.followersCount}>475k</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-youtube.svg"]}
                                alt="i5"
                            />
                            <div className={thiscss.followersCount}>879K</div>
                        </div>

                        <div className={thiscss.socials}>
                            <img
                                className={thiscss.socialsImg}
                                src={svgs["svg-reddit.svg"]}
                                alt="i6"
                            />
                            <div className={thiscss.followersCount}>65k</div>
                        </div>
                    </div>
                    <div className={userListStyles.CTAs}>
                        <button className={thiscss.ReqPartnershipBtn}>
                            Request Partnership
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
