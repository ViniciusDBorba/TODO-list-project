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

const getUser = (email) => {
    return model.getUser(email)
}

const canUserLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        const user = model.getUser(email)

        if (user) {
            resolve(user.password === password)
        } else {
            reject('Can not find any user with this email')
        }
    })
}

module.exports = {
    createUser,
    getUser,
    canUserLogin
}