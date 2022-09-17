import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null)

export const useAuth = () => {
    const authCtx = useContext(AuthContext);
    if (!authCtx) {
        throw new Error("Component beyond AuthContext!")
    }
    return authCtx;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

