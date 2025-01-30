import "./css/final-form.css";
import FormInput from "../components/form-input.jsx";
import { importAll } from "../components/js/import-data.js";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Finalise() {
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [profilePicImage, setProfilePicImage] = useState(null);
    const [loginUserData, setLoginUserData] = useState({ username: "" });
    const [isNewProfilePicSelected, setIsNewProfilePicSelected] =
        useState(false);
    const { user, setUser } = useUser();
    const usernameInputRef = useRef();
    const fullNameInputRef = useRef();
    const uploadFileRef = useRef();
    const userBioInputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (!!user) {
            setLoginUserData(user);
            if (!!user.profilepic) {
                setProfilePicPreview(user.profilepic);
                setProfilePicImage(user.profilepic);
            }
        }
    }, [user]);

    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );

    const handleUploadProfilePicButton = (e) => {
        e.preventDefault();
        uploadFileRef.current.click();
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file

        if (file) {
            setProfilePicImage(file);
            const objectURL = URL.createObjectURL(file);
            setProfilePicPreview(objectURL);
            setIsNewProfilePicSelected(true);
        }
    };

    // Cleanup to avoid memory leaks
    useEffect(() => {
        return () => {
            if (profilePicPreview) URL.revokeObjectURL(profilePicPreview);
        };
    }, [profilePicPreview]);

    const handleFinishButton = async (e) => {
        e.preventDefault();

        // Upload image and get new image path
        const formData = new FormData();
        formData.append("image", profilePicImage);
        let uploadedImagePath = "";
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/image/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            uploadedImagePath = response.data.image.path;
        } catch (err) {
            if (err.response.data.message === "Duplicate image detected.") {
                uploadedImagePath = err.response.data.existingImagePath;
            } else {
                console.log("Image upload error: ", err);
                return;
            }
        }

        let welcomeFormData = {
            username: usernameInputRef.current.value,
            fullName: fullNameInputRef.current.value,
            profilepic: isNewProfilePicSelected
                ? uploadedImagePath
                : !!user && !!user.profilepic
                ? user.profilepic
                : "",
            userBio: userBioInputRef.current.value,
        };

        // Update user data
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/users/welcome`,
                welcomeFormData,
                {
                    headers: {
                        token: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            setUser(res.data.newUserData);
            navigate("/user/home");
        } catch (err) {
            console.log("Welcome page form submission error: ", err);
        }
    };
    return (
        <>
            <div className="body-type-form-container">
                <div className="final-form">
                    <div id="form-card">
                        <div id="title-div">
                            <div id="title-linkyo"> Welcome to Linkyo.io </div>
                            <div id="title-desc">
                                Let's setup your profile first, you can edit it
                                later
                            </div>
                        </div>
                        <div id="form-inputs-component">
                            <FormInput
                                componentType="username"
                                componentValue={loginUserData.username}
                                componentRef={usernameInputRef}
                            />
                            <FormInput
                                componentType="fullName"
                                componentRef={fullNameInputRef}
                            />
                        </div>

                        <div className="Img-about-class">
                            <div className="upload-img-class">
                                <img
                                    id="profile-img"
                                    src={
                                        !!profilePicPreview
                                            ? profilePicPreview
                                            : svgs["img-upload1.svg"]
                                    }
                                    alt="profile pic"
                                />
                                <button
                                    type="button"
                                    id="upload-button"
                                    className="upload-profile-pic-button"
                                    onClick={handleUploadProfilePicButton}
                                >
                                    Upload profile Picture
                                </button>
                                <input
                                    type="file"
                                    name=""
                                    id=""
                                    accept="image/png, image/gif, image/jpeg"
                                    style={{ display: "none" }}
                                    ref={uploadFileRef}
                                    onChange={handleProfilePicChange}
                                />
                            </div>
                            <div className="Label-about-class">
                                <label id="label-about">About</label>
                                <div id="text-wrapper">
                                    <textarea
                                        id="about-yourself-text"
                                        placeholder="Write something about yourself. It will appear on your profile bio"
                                        ref={userBioInputRef}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="finishButton"
                        onClick={handleFinishButton}
                    >
                        Finish
                    </button>
                </div>
            </div>
        </>
    );
}
