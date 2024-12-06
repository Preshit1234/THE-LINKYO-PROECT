import './css/form-input.css';
import {importAll} from '../components/js/import-data.js';
import { useState, useEffect } from 'react';

export default function FormInput (props) {
    const svgs = importAll(require.context('../assets/svgs/', false, /\.(png|jpe?g|svg)$/));
    const [type, setType] = useState();

    useEffect (() => {
        setType(props.type);
    });

    if (type === "username") {
        return (
            <div className="form-input-container">
                <label htmlFor="input-username" className="input-label">User Name</label>
                <div className="form-input-wrap input-username-wrap">
                    <span>linkyo.io</span>
                    <input type="text" className="input-username" placeholder="john_doe" />
                </div>
            </div>
        );
    }

    if (type === "fullName") {
        return (
            <div className="form-input-container">
                <label htmlFor="input-email" className="input-label">Full Name</label>
                <input type="text" className="form-input-wrap input-email" placeholder='John Doe'/>
            </div>
        );
    }

    if (type === "email") {
        return (
            <div className="form-input-container">
                <label htmlFor="input-email" className="input-label">Email Address</label>
                <input type="email" className="form-input-wrap input-email" placeholder='johndoe@email.com'/>
            </div>
        );
    }

    if (type === "password") {
        return (
            <div className="form-input-container">
                <label htmlFor="input-password" className="input-label">Password</label>
                <div className="form-input-wrap input-password-wrap">
                    <input type="password" className="input-password" />
                    <div>
                        <img src={svgs["eye.svg"]} alt="" style={{height: "20px", width: "20px"}} />
                    </div>
                </div>
            </div>
        );
    }

    if (type === "usage-consent-check") {
        return (
            // <label htmlFor='input-usage-consent' className="input-usage-consent-container">
            //     <input type="checkbox" className="input-usage-consent-checkbox" />
            //     <span className="input-usage-consent-checkbox">
            //         <img src={svgs["check.svg"]} alt="" />
            //     </span>
            //     I agree to the privacy policy & cookie usage.
            // </label>

            <div class="checkbox-wrapper-4">
                <input class="inp-cbx" id="morning" type="checkbox" />
                <label class="cbx" for="morning">
                    <span>
                        <svg width="12px" height="10px">
                            <use href="#check-4"></use>
                        </svg>
                    </span>
                    <span>I agree to the privacy policy and cookie usage</span>
                </label>
                <svg class="inline-svg">
                    <symbol id="check-4" viewbox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </symbol>
                </svg>
            </div>
        );
    }
}