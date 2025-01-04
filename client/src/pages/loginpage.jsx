import loginstyles from './css/loginpage.module.css'
import {importAll} from '../components/js/import-data.js';
import FormInput from '../components/form-input.jsx';
import { useRef } from 'react';

export default function LoginPageX(){

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    //console.log(emailInputRef.current.value, passwordInputRef.current.value);

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
                        <FormInput
                            componentType="email"
                            componentIdPrefix="loginpage"
                            componentRef={emailInputRef}
                        />
                        <FormInput
                            componentType="password"
                            componentIdPrefix="loginpage"
                            componentRef={passwordInputRef}
                        />
                        <div className = { loginstyles.forgotPassLink }>Forgotten your Password?</div>
                    </div>
                    <div className = { loginstyles.logInBtnsContainer }>
                        <div className = {loginstyles.logInBtn }>
                            <button type="button" className={ loginstyles.signInBtn }>Log in</button>
                        </div>
                        <div className = { loginstyles.theOrGroup }>
                            <hr className = { loginstyles.HrTag} />
                            <div className = { loginstyles.OrTitle }>OR</div>
                            <hr className = { loginstyles.HrTag} />
                        </div>
                        <div className = { loginstyles.googleLoginBtn }>
                            {/* prithvi is building component for google login button */}
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