const model = require('../models/user.model')

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        if (!user.name || !user.name.trim()) {
            reject('User name can not be null or empty')
            return
        }
        if (!user.email || !user.email.trim()) {
            reject('User email can not be null or empty')
            return
        }
        if (!user.password || !user.password.trim()) {
            reject('User password can not be null or empty')
            return
        }

        model.saveUser(user)
        .then(email => {
            resolve(email)
        }).catch(e => {
            reject(e)
        })
    })
}

module.exports = {
    createUser
}