const model = require('../models/user.model')


const saveUser = (user) => {
    return new Promise((resolve, reject) => {
        model.saveUser(user)
        resolve(user.email)
    })
    
}

module.exports = {
    saveUser
}