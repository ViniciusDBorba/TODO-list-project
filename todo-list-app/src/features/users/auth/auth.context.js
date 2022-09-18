import { createContext, useState, useContext, useEffect } from "react";
import { UserOptions } from "../user-options/user-options.component";
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

    const renderUserUi = () => {
        if (user) {
            return (<UserOptions/>)
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <div className="app-header">
                <p className="app-title">TODO List</p>
                {renderUserUi()}
            </div>
            {initialized ? children : ""}
        </AuthContext.Provider>
    )
}



