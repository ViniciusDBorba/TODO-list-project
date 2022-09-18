var active_users_sessions = [] 

const saveSession = (session) => {
    return new Promise((resolve, reject) => {
        if (!session.userid || !session.userid.trim()) {
            reject('Null or empty userid')
            return
        }
        active_users_sessions[session.userid] = session
        console.log(active_users_sessions)
        resolve(session.userid)
    })
    
}

const getSession = (userid) => {
    return active_users_sessions[userid]
}

const removeSession = (userid) => {
    active_users_sessions = active_users_sessions.filter(ses => ses.userid != userid)
}

const clearSessionCollection = () => {
    active_users_sessions = {}
}

module.exports = {
    saveSession,
    getSession,
    removeSession,
    clearSessionCollection
    
};