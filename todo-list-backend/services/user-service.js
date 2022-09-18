const model = require('../models/user.model')


const createUser = (user) => {
    return new Promise((resolve, reject) => {
        model.saveUser(user)
        .then(email => {
            resolve(email)
        })
        .catch(e => {
            reject(e)
        })
    })
}

module.exports = {
    createUser
}