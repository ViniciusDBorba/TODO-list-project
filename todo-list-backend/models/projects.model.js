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

module.exports = {
    saveProject,
    getUserProjects,
    getProject
};