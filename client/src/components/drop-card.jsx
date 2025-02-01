import "./css/drop-card.css";
import { importAll } from "./js/import-data";
import styles from "./css/DropCard.module.css";
import {useState, useEffect} from 'react';
import axios from 'axios';

/**
 * A react component that renders a Drop
 * @param {Object{drop: object}} props Data is passed through custom attributes called props
 * @returns {ReactNode} A react element that renders a Drop
 */
export default function DropCard({item}) {
    /**
     * All images with png, jpg and jpeg extensions from assets/images/ folder
     */
    const images = importAll(
        require.context("../assets/images/", false, /\.(png|jpe?g|svg)$/)
    );

    /**
     * All images with svg extensions from assets/svgs/ folder
     */
    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );

    // const drop = props.drop;

    const [drop, setDrop] = useState({});

    const handleTagClick = (tag) => {
        alert(`You clicked on: ${tag}`);
      };

    useEffect(()=>{
        const getDrops = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/api/drops/"+item,{
                    headers: {
                        token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWI5ZDQxZWVhODJkZTZkZWE1ZTlhMCIsImlhdCI6MTczODI1MTY4MSwiZXhwIjoxNzM4NjgzNjgxfQ.ofwJ_raJk8kGTU4FekSHncPs1KTGaiSQ3CjhJJW6XRw"
                    },
                });
                setDrop(res.data)
            }catch(err){
                console.log(err);
            }
        }; getDrops();
    },[item])

    return (
        <div className={styles.container}>
            <div className={styles.wrap1}>
                <div className={styles.wrap1a}>
                    <p className={styles.pDescription}>
                        {drop.short_desc}
                    </p>
                    <p className={styles.pOffer}>
                        <span className={styles.potext1}>Earn</span>
                        <span className={styles.potext2}>{drop.value}</span>
                        <span className={styles.potext3}>
                            / Premium User Signup
                        </span>
                    </p>
                    <div className={styles.wrap1a1}>
                        <div className={styles.pAutherWrapper}>
                            <span className={styles.pAuthor}>By {drop.org_name}</span>
                            <img
                                src={svgs["verification-tick.svg"]}
                                alt="verification tick"
                            />
                        </div>
                        {drop.tags?.map((tag, i) => (
                            <span className={styles.pTags}key={i}>
                                {tag}
                            </span>
                            ))}
                    </div>
                </div>
                <div className={styles.wrap1b}>
                    {drop.productPic && <img
                        src={`data:image/jpeg;base64,${drop.productPic}`}
                        alt="product cover"
                        className={styles.pCover}
                    />}
                    <div className={styles.wrap1b1}>
                        <p className={styles.pTitle}>{drop.product_name}</p>
                        <p className={styles.pSubtitle}>
                            {drop.tagline}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.wrap2}>
                <button className={styles.viewDropBtn}>View Drop</button>
                <button className={styles.fetchLinkBtn}>Fetch Link</button>
            </div>
        </div>
    );

    // return (
    //     <div className="drop-card">

    //         {/* For names and tags */}
    //         <div className="grid-item grid-item-1">

    //             {/* For names */}
    //             <div className="drop-card-names">
    //                 <div><span className="drop-card-name">{drop.name}</span></div>
    //                 <div>
    //                     <span className="drop-card-publisher">
    //                         <span>By</span> &nbsp;
    //                         <span>{drop.publisher}</span> &nbsp;
    //                         {
    //                             drop.is_publisher_verified === "y" ?
    //                             <img
    //                                 src={svgs['verification-tick.svg']}
    //                                 alt="Verification Tick"
    //                                 className="verification-tick"
    //                             />
    //                             : ""
    //                         }
    //                     </span>
    //                 </div>
    //             </div>

    //             {/* For Tags */}
    //             <div className="drop-card-tags">
    //                 {
    //                     drop.tags && drop.tags.length > 0 ?
    //                     drop.tags.map((tag) => <span className="drop-card-tag" key={tag}>{tag}</span>)
    //                     : ""
    //                 }
    //             </div>

    //         </div>

    //         {/* For thumbnail */}
    //         <div className="grid-item grid-item-2">
    //             <img src={images[drop.thumbnail_url]} alt="Drop Thumbnail" className="drop-card-thumbnail" />
    //         </div>

    //         {/* For description */}
    //         <div className="grid-item grid-item-3">
    //             <p>{drop.description}</p>
    //         </div>

    //         {/* For call to action buttons */}
    //         <div className="grid-item grid-item-4">
    //             <button className="drop-card-button-fetch-link">Fetch Link</button>
    //             <button className="drop-card-button-view-drop">View Drop</button>
    //         </div>

    //         {/* For ratings */}
    //         <div className="grid-item grid-item-5">
    //             <span className="drop-card-rating-description">
    //                 <span className="drop-card-rating-description-1">Linkyo</span>
    //                 <span className="drop-card-rating-description-2">score</span>
    //             </span>
    //             <span className="drop-card-rating-number">{drop.score}%</span>
    //         </div>
    //     </div>
    // );
}
