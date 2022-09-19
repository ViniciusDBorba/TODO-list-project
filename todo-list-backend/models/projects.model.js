var projects_collection = {}

const saveProject = (project, userid) => {
    return new Promise((resolve, reject) => {
        if (!project) {
            reject('Null or empty project')
            return
        }
        if (!projects_collection[userid]) {
            projects_collection[userid] = {}
        }
        projects_collection[userid][project.name] = project
        resolve(projects_collection[userid][project.name])
    })
}

const getUserProjects = (userid) => {
    const project = projects_collection[userid]
    if (project) {
        return Object.values(projects_collection[userid])
    } else {
        return null
    }
    
}

const getProject = (projectName, userId) => {
    const userProjects = projects_collection[userId]
    if (userProjects) {
        return userProjects[projectName]
    } else {
        return null
    }
}

const deleteProject = (projectName, userid) => {
    return new Promise((resolve, reject) => {
        const projectList = getUserProjects(userid)
        projects_collection[userid] = {}
        projectList.forEach(project => {
            if (project.name !== projectName) {
                projects_collection[userid][project.name] = project
            }
        })
        resolve(getUserProjects(userid))
    })
}

module.exports = {
    saveProject,
    getUserProjects,
    getProject,
    deleteProject
};