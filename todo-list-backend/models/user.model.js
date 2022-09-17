var users_collection = {}

const saveUser = (user) => {
    users_collection[user.email] = user
    console.log(users_collection)
}

const getUser = (email) => {
    return users_collection[email]
}

module.exports = {
    saveUser,
    getUser
};