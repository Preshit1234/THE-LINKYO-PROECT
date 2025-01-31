import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function VerifyEmailToken() {
    let params = useParams();
    let token = params.token;
    let navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            console.log("Verifying the email");
            try {
                let res = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify/email/token`,
                    {
                        token: token,
                    }
                );
                // setTempUser(res.data.user);
                console.log("res.data.user: ");
                console.log(res.data.user);
                // setLoginUserData(res.data.user);
                const loginUserData = res.data.user;
                if (loginUserData) {
                    !loginUserData.isWelcomed
                        ? navigate("/signin")
                        : navigate("/user/home");
                }
            } catch (err) {
                console.log(err);
            }
        };

        verifyEmail();
    });

    return <>Verifying your email...</>;
}
