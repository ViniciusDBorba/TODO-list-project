import { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "../users.service";

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [initialized, setInitialized] = useState(false)
    const [user, setUser] = useState(null)

    const handleGetUserResponse = (res) => {
        if (res.status === 200) {
            setUser(res.data)
        } else {
            setUser(null)
        }

        setInitialized(true)
    }

    useEffect(() => {
        getUser().then(res => {
            handleGetUserResponse(res)
        }).catch(e => {
            handleGetUserResponse(e.response)
        })
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {initialized ? children : ""}
        </AuthContext.Provider>
    )
}



