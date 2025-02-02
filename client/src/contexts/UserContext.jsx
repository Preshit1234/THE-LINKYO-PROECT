/** @module UserContext */

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

// Import this function to make changes to the user context
/**
 * Stores the login user data to use it throughout the application.
 *
 * Import syntax example:
 * - import { useUser } from "../contexts/UserContext";
 *
 * Usage:
 * - const { user } = useUser(); --- Get login user data.
 * - const { setUser } = useUser(); --- A function to store login user data.
 * - const { user, setUser } = useUser();
 *
 * The { user } and { setUser } are properties of UserProvider
 *
 * @returns UserContext
 */
export function useUser() {
    return useContext(UserContext);
}

/**
 * Provider of UserContext
 * @param {*} param0
 * @returns UserProvider ReactNode
 */
export default function UserProvider({ children }) {
    /**
     * A state variable to store logged in user data
     */
    const [user, setUser] = useState();

    useEffect(() => {
        // if (!user) getLoginData();
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
