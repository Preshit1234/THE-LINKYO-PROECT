import "./css/final-form.css";
import FormInput from "../components/form-input.jsx";
import { importAll } from "../components/js/import-data.js";

export default function finalise() {
    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );
    return (
        <>
            <div className="body-type-form-container">
                <div className="final-form">
                    <div id="form-card">
                        <div id="title-div">
                            <div id="title-linkyo"> Welcome to Linkyo.io </div>
                            <div id="title-desc">
                                {" "}
                                Let's setup your profile first, you can edit it
                                later{" "}
                            </div>
                        </div>
                        <div id="form-inputs-component">
                            <FormInput type="username" />
                            <FormInput type="fullName" />
                        </div>

                        <div className="Img-about-class">
                            <div className="upload-img-class">
                                <img
                                    id="profile-img"
                                    src={svgs["img-upload1.svg"]}
                                    alt="profile pic"
                                />
                                <button type="button" id="upload-button">
                                    {" "}
                                    Upload profile Picture{" "}
                                </button>
                            </div>
                            <div className="Label-about-class">
                                <label id="label-about">About</label>
                                <div id="text-wrapper">
                                    <textarea
                                        id="about-yourself-text"
                                        placeholder="Write something about yourself. It will appear on your profile bio"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="finishButton" onClick="">
                        Finish
                    </button>
                </div>
            </div>
        </>
    );
}
