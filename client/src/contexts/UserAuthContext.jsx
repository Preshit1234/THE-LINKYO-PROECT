/** @module UserAuthContext */

import { createContext, useEffect } from "react";
import { useUser } from "./UserContext";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const UserAuthContext = createContext();

const socket = io(process.env.REACT_APP_BACKEND_URL);

/**
 * Provider of UserAuthContext
 * @param {*} param0
 * @returns UserAuthProvider ReactNode
 */
export default function UserAuthProvider() {
    /**
     * A state variable to store logged in user data
     */
    const { user, setUser } = useUser();
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    // If login establish socket connection for live updates
    useEffect(() => {
        if (!!user && !!accessToken) {
            socket.emit("registerUser", {
                userId: user.id,
            });
        }
    }, [user, accessToken]);

    useEffect(() => {
        if (!accessToken) {
            navigate("/signin");
            return;
        }

        /**
         * A function to get missing login data.
         * In case if the user state is reset, the missing data will be retreived with the access token
         * stored in the localStorage.
         *
         * The retrieved data will be stored in the user state to access it throughout our application.
         */
        const getLoginData = async () => {
            if (!!accessToken) {
                let reqBody = {
                    accessToken: accessToken,
                };
                try {
                    let res = await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/api/auth/user/login/data`,
                        reqBody
                    );
                    setUser(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        if (!user) {
            getLoginData();
        }
    }, [user, setUser, accessToken, navigate]);

    if (!!user && !!accessToken) {
        return (
            <UserAuthContext.Provider value={{}}>
                <Outlet />
            </UserAuthContext.Provider>
        );
    }
}
