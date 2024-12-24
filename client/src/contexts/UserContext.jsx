import { useState, useContext, createContext } from "react";

const UserContext = createContext();

export function useUser () {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}