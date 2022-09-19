const model = require('../models/projects.model')

const createProject = (projectName, userid) => {
    return new Promise(async (resolve, reject) => {
        if (!projectName || !projectName.trim()) {
            reject('Project name can not be null or empty')
            return
        }
        
        if (projectExists(userid, projectName)) {
            reject(`Project with name ${projectName} from user ${userid} awready exist`)
            return
        }

        const project = {
            name: projectName,
            todos: []
        }

        model.saveProject(project, userid)
        .then(project => {
            resolve(project)
        }).catch(e => {
            reject(e)
        })
    })
}

const projectExists = (userid, projectName) => {
    return model.getProject(projectName, userid) ? true : false
}

const getUserProjects = (userid) => {
    return new Promise((resolve, reject) => {
        const projects = model.getUserProjects(userid)
        if (projects) {
            resolve(projects)
        } else {
            reject(`No projects from user ${userid} founded`)
        }
    })
}

const addTodo = (todoDescription, projectName, userid) => {
    return new Promise(async (resolve, reject) => {
        if (!todoDescription || !todoDescription.trim()) {
            reject('Todo description can not be null or empty')
            return
        }
        
        if (!projectExists(userid, projectName)) {
            reject(`Project with name ${projectName} from user ${userid} does not exist`)
            return
        }

        const project = model.getProject(projectName, userid)

        const findedTodos = project.todos.filter(t => t.description === todoDescription)

        if (findedTodos && findedTodos.length > 0) {
            reject(`Todo with description ${todoDescription} alwready exist`)
            return
        }
        const todo = {
            description: todoDescription,
            done: false
        }

        project.todos.push(todo)
        
        model.saveProject(project, userid)
        .then(project => {
            resolve(project.todos)
        }).catch(e => {
            reject(e)
        })
    })
}

const updateTodoStatus = (ended, todoDescription, projectName, userid) => {
    return new Promise(async (resolve, reject) => {
        if (!todoDescription || !todoDescription.trim()) {
            reject('Todo description can not be null or empty')
            return
        }
        
        if (!projectExists(userid, projectName)) {
            reject(`Project with name ${projectName} from user ${userid} does not exist`)
            return
        }

        const project = model.getProject(projectName, userid)

        const findedTodos = project.todos.filter(t => t.description === todoDescription)

        if (!findedTodos && !findedTodos.length > 0) {
            reject(`Todo with description ${todoDescription} does not exist`)
            return
        }

        project.todos = project.todos.map(todo => {
            if (todo.description === todoDescription) {
                return {...todo, done: ended}
            }

            return todo
        })
        
        model.saveProject(project, userid)
        .then(project => {
            resolve(project.todos)
        }).catch(e => {
            reject(e)
        })
    })
}

module.exports = {
    createProject,
    getUserProjects,
    addTodo,
    updateTodoStatus
}