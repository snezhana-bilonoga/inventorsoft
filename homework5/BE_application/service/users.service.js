let users = [];

function getUsers() {
    return users;
}

function getUserById(id) {
    return users.find((user) => user.id === id);
}

function getUserByEmail(email) {
    return users.find((el) => el.email === email);
}

function addUser(user) {
    users.push(user);
}

function updateUserById(id, { name, email, password }) {
    const storedUser = users.find((user) => user.id === id);
    storedUser.name = name;
    storedUser.email = email;
    storedUser.password = password;
}

function deleteUserById(id) {
    users = users.filter((user) => user.id !== id);
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    deleteUserById,
    updateUserById,
};
