import "./css/check-yo-email.css";
import { importAll } from "../components/js/import-data.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CheckEmail() {
    const svgs = importAll(
        require.context("../assets/svgs/", false, /\.(png|jpe?g|svg)$/)
    );

    const [email, setEmail] = useState();
    const location = useLocation();

    useEffect(() => {
        if (!!location.state === true) {
            if (!!location.state.email) setEmail(location.state.email);
        }
    }, [location.state]);

    return (
        <div className="body-type-class">
            <div id="check-yo-email-container">
                <div className="email-img-container">
                    <img
                        id="email-img"
                        src={svgs["email-open-svgrepo-com.svg"]}
                        alt="email icon"
                    />
                </div>
                <h3 className="check-your-email-title">Check Your Email</h3>
                <h4 id="text-content">
                    {!!email ? (
                        <>
                            We've sent an email to <b>{email}</b>
                        </>
                    ) : (
                        "We've sent an email to your email address"
                    )}
                    . It is important to verify your email address to guarantee
                    the best email and calender deliverability from Linkyo.io
                    <br />
                    <br />
                    This email will expire in 4 minutes.
                </h4>
                <h3 id="do-underline">Resend Email</h3>
            </div>
        </div>
    );
}
