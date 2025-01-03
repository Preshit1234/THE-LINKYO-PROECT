import loginstyles from './css/loginpage.module.css'
import {importAll} from '../components/js/import-data.js';
import FormInput from '../components/form-input.jsx';

export default function LoginPageX(){
    const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));
    const svgs= importAll(require.context('../assets/svgs/', false, /\.(png|jpe?g|svg)$/));
    return(
        <>
            <div className = { loginstyles.loginPageClass }>
                <div className = { loginstyles.loginPageContainer }>
                    <div className = { loginstyles.titleContainer }>
                        <div className = { loginstyles.titleName }>
                            Welcome Back to Linkyo.io
                        </div>
                    </div>
                    <div className = { loginstyles.emailPassContainer }>
                        <FormInput type = "email" />
                        <FormInput type = "password" />
                        <div className = { loginstyles.forgotPassLink }>Forgotten your Password?</div>
                    </div>
                    <div className = { loginstyles.logInBtnsContainer }>
                        <div className = {loginstyles.logInBtn }>
                            <button type="button" className={ loginstyles.updateBtn }>Update Info</button>
                        </div>
                        <div className = { loginstyles.theOrGroup }>
                            <div className = { loginstyles.OrTitle }>OR</div>
                        </div>
                        <div className = { loginstyles.googleLoginBtn }>

                        </div>
                    </div>
                    <div className = { loginstyles.signUpClass }>
                        <div className = { loginstyles.signUpTitleClass }>
                            <div className = { loginstyles.signUpAcctitle }>Don't have an Account? </div> 
                            <div className = { loginstyles.signUpTitle }>Sign Up </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}