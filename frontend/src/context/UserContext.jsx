import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function MainWrapper({children}) {
    const [user, setUser] = useState({signedIn:false, firstName:"", lastName:"", adminFlag: false});
    return(
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}