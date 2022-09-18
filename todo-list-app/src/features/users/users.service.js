import Api from "../../api/api"
let api = new Api(process.env.REACT_APP_API_USERS_ROUTE)

export const registerUser = (name, email, password) => {
    return api.post("/register", {name, email, password})
}

export const getUser = () => {
    return api.get("/")
}

export const login = (email, password) => {
    return api.post("/login", {email, password})
}

export const logout = () => {
    return api.get("/logout")
}