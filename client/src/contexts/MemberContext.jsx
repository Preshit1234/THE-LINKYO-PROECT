/** @module MemberContext */

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

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
export default function MemberProvider({ children }) {
    /**
     * A state variable to store logged in member data
     */
    const [member, setMember] = useState();

    useEffect(() => {
        if (!member) getLoginData();
    }, [member]);

    /**
     * A function to get missing login data.
     * In case if the member state is reset, the missing data will be retreived with the access token
     * stored in the localStorage.
     *
     * The retrieved data will be stored in the member state to access it throughout our application.
     */
    const getLoginData = async () => {
        let memberAccessToken = localStorage.getItem("memberAccessToken");
        if (!!memberAccessToken) {
            let reqBody = {
                memberAccessToken: memberAccessToken,
            };
            try {
                let res = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/auth/member/login/data`,
                    reqBody
                );
                setMember(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <MemberContext.Provider value={{ member, setMember }}>
            {children}
        </MemberContext.Provider>
    );
}
