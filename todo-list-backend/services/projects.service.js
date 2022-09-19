const model = require('../models/projects.model')

const createProject = (projectName, userid) => {
    return new Promise(async (resolve, reject) => {
        if (!projectName || !projectName.trim()) {
            reject('Project name can not be null or empty')
            return
        }
        
        if (projectExists(userid, projectName)) {
            reject(`Project with name ${projectName} from user ${userid} already exist`)
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

const deleteProject = (projectName, userid) => {
    return new Promise(async (resolve, reject) => {
        if (!projectName || !projectName.trim()) {
            reject('Project name can not be null or empty')
            return
        }
        
        if (!projectExists(userid, projectName)) {
            reject(`Project with name ${projectName} from user ${userid} does not exist`)
            return
        }

        model.deleteProject(projectName, userid)
        .then(deleted => {
            if (deleted) {
                resolve(model.getUserProjects(userid))
            }
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
            reject(`Todo with description ${todoDescription} already exist`)
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

const deleteProjectTodo = (todoDescription, projectName, userid) => {
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

        project.todos = project.todos.filter(t => t.description !== todoDescription)
        
        model.saveProject(project, userid)
        .then(project => {
            resolve(project.todos)
        }).catch(e => {
            reject(e)
        })
    })
}

const updateProjectName = (oldName, newName, userid) => {
    return new Promise(async (resolve, reject) => {
        if (!oldName || !oldName.trim()) {
            reject('Old project name can not be null or empty')
            return
        }

        if (!newName || !newName.trim()) {
            reject('New project name can not be null or empty')
            return
        }
        
        if (!projectExists(userid, oldName)) {
            reject(`Project with name ${oldName} from user ${userid} does not exist`)
            return
        }

        if (projectExists(userid, newName)) {
            reject(`Project with name ${newName} from user ${userid} already`)
            return
        }

        const project = model.getProject(oldName, userid)
        project.name = newName
        
        
        model.updateProject(oldName, project, userid).then(updated => {
            if (updated) {
                resolve(model.getUserProjects(userid))
            }
        }).catch(e => {
            reject(e)
        })
        
    })
}

module.exports = {
    createProject,
    getUserProjects,
    addTodo,
    updateTodoStatus,
    deleteProject,
    updateProjectName,
    deleteProjectTodo
}