import editUserStyles from './css/edit-user.module.css';
import FormInput from '../components/form-input.jsx';
import {importAll} from '../components/js/import-data.js';

export default function EditUser() {
    const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));
    const svgs= importAll(require.context('../assets/svgs/', false, /\.(png|jpe?g|svg)$/));
    return(
        <>
        <div className={ editUserStyles.wholePageDiv }>
            <div className={ editUserStyles.parentClass }>
                <div className={ editUserStyles.profileClass }>
                    <div className={ editUserStyles.titleDiv }>
                        <div className={ editUserStyles.title }> Profile </div>
                        <div className={ editUserStyles.titleDesc }> Manage your Linkyo.io profile here </div>
                    </div>
                    <hr className={ editUserStyles.hrTag } />
                    <div className={ editUserStyles.profileFormClass }>
                        <div className={ editUserStyles.profileImgClass }>
                            <img className={ editUserStyles.profilePic } src={svgs["img-upload1.svg"]} />
                            <div className={ editUserStyles.pfpTitleClass }>
                                <div className={ editUserStyles.pfpTitle}>Profile Picture</div>
                                <div className={ editUserStyles.pfpBtnClass }>
                                    <button className={ editUserStyles.pfpBtn } type="button">Upload New</button>
                                    <button className={ editUserStyles.pfpBtn } type="button">Remove</button>
                                </div>
                            </div>
                        </div>
                        <div className={ editUserStyles.formClass }>
                            <FormInput type = "username" />
                            <FormInput type = "fullName" />
                            <FormInput type = "email" />
                            <div>About</div>
                            <div id="text-wrapper">
                                <textarea id='about-yourself-text' placeholder='Write something about yourself. It will appear on your profile bio'></textarea>
                            </div>
                        </div>
                        <div className={ editUserStyles.updateBtnClass }>
                            <button type="button" className={ editUserStyles.updateBtn }>Update Info</button>
                        </div>
                    </div>
                </div>
                <div className={ editUserStyles.deleteAccClass }>
                    <div className={ editUserStyles.deleteTitleClass }>
                        <div className={ editUserStyles.deleteTitle }>Delete My Account</div>
                        <div className={ editUserStyles.deleteDesc }>Account deletion cannot be undone!</div>
                    </div>
                    <div className={ editUserStyles.deleteBtnClass }>
                        <button type="button" className={ editUserStyles.deleteBtn }>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
