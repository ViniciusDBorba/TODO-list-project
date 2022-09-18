const model = require('../models/session.model')

const saveSession = (email, session) => {
    return new Promise((resolve, reject) => {
        session.userid = email
        model.saveSession(session)
        .then(email => {
            resolve(email)
        }).catch(e => {
            reject(e)
        })
    })
}

const sessionExists = (userid) => {
    return model.getSession(userid) ? true : false
}

const removeSession = (userid) => {
    model.removeSession(userid)
}

module.exports = {
    saveSession,
    sessionExists,
    removeSession
}