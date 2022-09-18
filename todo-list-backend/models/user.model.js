var users_collection = {}

const saveUser = (user) => {
    return new Promise((resolve, reject) => {
        if (!user.email || !user.email.trim()) {
            reject('Null or empty email')
            return
        }
        users_collection[user.email] = user
        console.log(users_collection)
        resolve(user.email)
    })
    
}

const getUser = (email) => {
    return users_collection[email]
}

const clearUserCollection = () => {
    users_collection = {}
}

module.exports = {
    saveUser,
    getUser,
    clearUserCollection
};