import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";

export default function VerifyEmailToken() {
    let params = useParams();
    let token = params.token;
    let navigate = useNavigate();

    // const [tempUser, setTempUser] = useState();
    // const [loginUserData, setLoginUserData] = useState();

    const { setUser } = useUser();

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
                    setUser(loginUserData);
                    console.log("Login User Data: ", loginUserData);
                    !loginUserData.isWelcomed
                        ? navigate("/signinpage")
                        : navigate("/browse/drops");
                }
            } catch (err) {
                console.log(err);
            }
        };

        // if (!tempUser === true) verifyEmail();
        verifyEmail();
    });

    // useEffect(() => {
    //     if (loginUserData) {
    //         setUser(loginUserData);
    //         !loginUserData.isWelcomed
    //             ? navigate("/login")
    //             : navigate("/browse/drops");
    //     }
    // });

    return <>Verifying your email...</>;
}
