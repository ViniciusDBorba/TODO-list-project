import { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "../users.service";

const AuthContext = createContext(null)

export const useAuth = () => {
    const authCtx = useContext(AuthContext);
    if (!authCtx) {
        throw new Error("Component beyond AuthContext!")
    }
    return authCtx;
}

export const AuthProvider = ({children}) => {
    const [initialized, setInitialized] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser().then(res => {
            if (res.status === 200) {
                setUser(res.data)
            } else {
                setUser(null)
            }

            setInitialized(true)
        })
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {initialized ? children : ""}
        </AuthContext.Provider>
    )
}



