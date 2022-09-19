import Api from "../../api/api"
let api = new Api(process.env.REACT_APP_API_PROJECTS_ROUTE)

export const createProject = (name) => {
    return api.post("/new", {name})
}

export const getProjects = () => {
    return api.get("/")
}

export const deleteProject = (name) => {
    return api.delete("/deleteProject", {name})
}

export const addTodo = (todoDescription, projectName) => {
    return api.put("/addTodo", {todoDescription, projectName})
}

export const updateTodoStatus = (ended, todoDescription, projectName) => {
    return api.put("/updateTodoStatus", {ended, todoDescription, projectName})
}