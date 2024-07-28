import Header from "../components/header";
import './css/create-drop.css';
import { importAll } from "../components/js/import-data";
import DropCard from "../components/drop-card";

/**
 * A dummy api response for rendering drop card component.
 */
const dummyDrop = {
    "id" : 3,
    "name" : "CoCA",
    "publisher" : "Alok",
    "is_publisher_verified" : "n",
    "description" : "The world's first MPC wallet with non-custodial card.",
    "thumbnail_url" : "Framethumbnail-coca.png",
    "product_url" : "",
    "score" : "130",
    "tags" : [
        "Fintech",
        "Finance",
        "Blockchain"
    ]
};

/**
 * A react component that renders the create drop page.
 * @returns {ReactNode}
 */
const CreateDrop = () => {
    /**
     * Contains all svgs from assets/svgs/ folder
     */
    const svgs = importAll(require.context('../assets/svgs/', false, /.(png|jpe?g|svg)$/));

    return (
        <div id="create-drop-container">
            <Header type="login" />
            <div id="create-drop-content">
                <p id="create-drop-tagline-1">Drop Your Product and reach out to Millions.</p>
                <p id="create-drop-tagline-2">
                    Step into the spotlight and unveil your ingenious creation to the world!  Whether you've stumbled upon a game-changing gadget or crafted a product with your own hands, it's time to let the universe know. 
                    This is your moment to shine, to share your brilliance with eager minds and curious souls. <br /><br />
                </p>
                <form action="" method="" id="create-drop-form">
                    <div id="create-drop-subform-1-container">
                        <div id="create-drop-subform-1">
                            <input type="text" name="productInitialUrl" id="create-drop-subform-1-input" placeholder="Enter Product URL if any" />
                            <button id="create-drop-subform-1-get-started-button">Get Started</button>
                        </div>
                    </div>
                    <div id="create-drop-form-main-display-container">
                        <div id="create-drop-form-main-form-display">
                            <div id="create-drop-form-main-form-display-header">
                                <span>Editor</span>
                            </div>
                            <hr />
                            <div id="create-drop-form-main-form-display-body">
                                <div id="create-drop-form-main-form-display-body-sections">
                                    <span className="active">1. About <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{border: "1px solid blue"}}>{/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}<path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg></span> </span>
                                    <span className="">2. Add Assets <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                    <span className="">3. Add Owners <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                    <span className="">4. Add Offer <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                    <span className="">5. Drop <span><img src={svgs["check-circle-inactive.svg"]} alt="inactive indicator" /></span> </span>
                                </div>
                                <div id="create-drop-form-subform-2" className="create-drop-form-subforms">
                                    <fieldset id="create-drop-form-subform-2-fieldset-1">
                                        <div id="create-drop-form-subform-2-body-text-1">
                                            <p>First Tell us more about this product</p>
                                            <p>We'll need it's name, tagline, links, tags and description.</p>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="productUrl" className="create-drop-form-input-field-labels">URL</label>
                                            <input type="text" name="productUrl" id="" placeholder="Enter Product URL if any" className="create-drop-form-text-inputs" />
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="productName" className="create-drop-form-input-field-labels">Name of the Product</label>
                                            <input type="text" name="productName" id="" placeholder="Enter Name" className="create-drop-form-text-inputs" />
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="productDescription" className="create-drop-form-input-field-labels">Description</label>
                                            <textarea name="productDesctiption" id="" rows="6" placeholder="Describe your product" className="create-drop-form-textarea-inputs"></textarea>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="tagline" className="create-drop-form-input-field-labels">Add Tagline</label>
                                            <input type="text" name="tagline" id="" placeholder="Enter a catchy tagline" className="create-drop-form-text-inputs" />
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="tags" className="create-drop-form-input-field-labels">Add Tags</label>
                                            <input type="text" name="tags" id="" placeholder="Enter Tags" className="create-drop-form-text-inputs" />
                                        </div>
                                        <div className="create-drop-form-navigation-buttons-container">
                                            <button className="create-drop-form-navigation-next-subform-buttons">Continue to Add assets</button>
                                        </div>
                                    </fieldset>

                                    <fieldset id="create-drop-form-subform-2-fieldset-2">
                                        <div id="create-drop-form-subform-2-body-text-2">
                                            <p>Great, Now Make it more reliable</p>
                                            <p>We'll need it's name, tagline, links, tags and description.</p>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <span className="create-drop-form-input-field-labels">Add Thumbnail</span>
                                            <label className="create-drop-form-file-input-containers">
                                                <input type="text" name="productThumbnail" className="create-drop-form-file-inputs" id="" placeholder="Select Image file to upload" />
                                                <img src={svgs["solar-upload-linear.svg"]} alt="upload icon" />
                                                <span>Select Image file to upload</span>                                            
                                            </label>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <span className="create-drop-form-input-field-labels">Add Related Images</span>
                                            <label className="create-drop-form-file-input-containers">
                                                <input type="text" name="productThumbnail" className="create-drop-form-file-inputs" id="" placeholder="Select Image file to upload" />
                                                <img src={svgs["solar-upload-linear.svg"]} alt="upload icon" />
                                                <span>Select Image file to upload</span>                                            
                                            </label>
                                        </div>
                                        <div className="create-drop-form-navigation-buttons-container">
                                            <button className="create-drop-form-navigation-next-subform-buttons">Next - Add Owners</button>
                                        </div>
                                    </fieldset>
                                    <fieldset id="create-drop-form-subform-2-fieldset-3">
                                        <div id="create-drop-form-subform-2-body-text-3">
                                            <p>Almost There, Now Assign owners to assets for clear accountability.</p>
                                            <p>Uploaded Products must be authenticated with Organization's Email, Yes.</p>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="ownerName" className="create-drop-form-input-field-labels">Name of the owner</label>
                                            <input type="text" name="ownerName" id="" placeholder="Enter Name" className="create-drop-form-text-inputs" />
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="orgEmail" className="create-drop-form-input-field-labels">Organizations's email</label>
                                            <input type="text" name="orgEmail" id="" placeholder="Enter email" className="create-drop-form-text-inputs" />
                                            <button className="create-drop-form-button" id="create-drop-form-verify-email-button">Verify</button>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="pin" className="create-drop-form-input-field-labels">Pin</label>
                                            <input type="number" name="pin" id="" placeholder="" className="create-drop-form-pin-inputs" />
                                            <input type="number" name="pin" id="" placeholder="" className="create-drop-form-pin-inputs" />
                                            <input type="number" name="pin" id="" placeholder="" className="create-drop-form-pin-inputs" />
                                            <input type="number" name="pin" id="" placeholder="" className="create-drop-form-pin-inputs" />
                                            <input type="number" name="pin" id="" placeholder="" className="create-drop-form-pin-inputs" />
                                            <input type="number" name="pin" id="" placeholder="" className="create-drop-form-pin-inputs" />
                                        </div>
                                        <div className="create-drop-form-navigation-buttons-container">
                                            <button className="create-drop-form-navigation-next-subform-buttons">Continue to Add Offers</button>
                                        </div>
                                    </fieldset>

                                    <fieldset id="create-drop-form-subform-2-fieldset-4">
                                        <div id="create-drop-form-subform-2-body-text-4">
                                            <p>Well, Now add offer related to your product.</p>
                                            <p>How much percent of the commission is earned by affiliates for each conversion, visit, download, install, etc.</p>
                                        </div>

                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="productPrice" className="create-drop-form-input-field-labels">Product Price</label>
                                            <input type="text" name="productPrice" id="" placeholder="Enter Price at which the product will be sold." className="create-drop-form-text-inputs" />

                                            <label htmlFor="currency" className="create-drop-form-input-field-labels">Choose currency</label>
                                            <select name="currency" id="" className="create-drop-form-select-inputs">
                                                <option value="inr">INR</option>
                                                <option value="dollar">Dollar</option>
                                            </select>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="commissionRate" className="create-drop-form-input-field-labels">Commission Rate</label>
                                            <input type="text" name="commissionRate" id="" placeholder="The percentage of each sale that will be given to affiliates as commission." className="create-drop-form-text-inputs" />
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="audienceDescription" className="create-drop-form-input-field-labels">Target Audience</label>
                                            <textarea name="audienceDesctiption" id="" rows="6" placeholder="A brief description of the ideal audience for the product." className="create-drop-form-textarea-inputs"></textarea>
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="campaignDate" className="create-drop-form-input-field-labels">Campaign Duration</label>
                                            <input name="campaignDate" id="" className="create-drop-form-date-inputs" />
                                        </div>
                                        <div className="create-drop-form-input-fields-container">
                                            <label htmlFor="paymentInfo" className="create-drop-form-input-field-labels">Payment Info</label>
                                            <input type="text" name="paymentInfo" id="" placeholder="" className="create-drop-form-text-inputs" />
                                        </div>
                                        <div className="create-drop-form-navigation-buttons-container">
                                            <button className="create-drop-form-navigation-next-subform-buttons">Next - Drop!</button>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                        <div id="create-drop-form-preview-display-container">
                            <div id="create-drop-form-preview-header">
                                <span id="create-drop-form-preview-text">Preview</span>
                                <button type="submit" id="create-drop-form-submit-button">Drop!</button>
                            </div>
                            <hr />
                            <div id="create-drop-form-preview-body">
                                <DropCard drop={dummyDrop} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateDrop;