var users_collection = {}

const saveUser = (user) => {
    return new Promise((resolve, reject) => {
        users_collection[user.email] = user
        console.log(users_collection)
        resolve(user.email)
    })
    
}

const getUser = (email) => {
    return users_collection[email]
}

module.exports = {
    saveUser,
    getUser
};