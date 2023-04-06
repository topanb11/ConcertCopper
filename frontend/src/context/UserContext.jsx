import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function MainWrapper({children}) {
    const [user, setUser] = useState();
    return(
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}