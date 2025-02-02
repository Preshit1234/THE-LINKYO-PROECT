/** @module MemberContext */

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const MemberContext = createContext();

// Import this function to make changes to the member context
/**
 * Stores the login member data to use it throughout the application.
 *
 * Import syntax example:
 * - import { useMember } from "../contexts/MemberContext";
 *
 * Usage:
 * - const { member } = useMember(); --- Get login member data.
 * - const { setMember } = useMember(); --- A function to store login member data.
 * - const { member, setMember } = useMember();
 *
 * The { member } and { setMember } are properties of MemberProvider
 *
 * @returns MemberContext
 */
export function useMember() {
    return useContext(MemberContext);
}

/**
 * Provider of MemberContext
 * @param {*} param0
 * @returns MemberProvider ReactNode
 */
export default function MemberProvider() {
    /**
     * A state variable to store logged in member data
     */
    const [member, setMember] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        if (!member) {
            getMemberData();
        } else {
            return;
        }
    }, [member]);

    useEffect(() => {
        let memberAccessToken = localStorage.getItem("memberAccessToken");
        if (!memberAccessToken) {
            navigate("/user/home");
            return;
        }
    });

    /**
     * A function to get missing login data.
     * In case if the member state is reset, the missing data will be retreived with the access token
     * stored in the localStorage.
     *
     * The retrieved data will be stored in the member state to access it throughout our application.
     */
    const getMemberData = async () => {
        let accessToken = localStorage.getItem("accessToken");
        let memberAccessToken = localStorage.getItem("memberAccessToken");
        if (!!memberAccessToken) {
            let authHeaders = {
                token: `Bearer ${accessToken}`,
                membertoken: `Bearer ${memberAccessToken}`,
            };
            try {
                let res = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/dropper/member/login/data`,
                    {
                        headers: authHeaders,
                    }
                );
                setMember(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <MemberContext.Provider value={{ member, setMember }}>
            {!!member ? (
                <Outlet />
            ) : (
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        diaplay: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        icon="svg-spinners:3-dots-scale"
                        width="100"
                        height="100"
                    />
                </div>
            )}
        </MemberContext.Provider>
    );
}
