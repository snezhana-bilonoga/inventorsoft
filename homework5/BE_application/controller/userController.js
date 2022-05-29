const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const userService = require('../service/users.service');

function getUsers(req, res) {
    res.send(userService.getUsers());
}

function getUserById(req, res) {
    const user = userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: 'User is not found' });
    }
    res.send(user);
}

async function updateUserById(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array(),
            message: 'Not correct login data',
        });
    }

    const user = userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: 'User is not found' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const updatedUser = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    };

    userService.updateUserById(req.params.id, updatedUser);
    res.send(updatedUser);
}

function deleteUserById(req, res) {
    const user = userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: 'User is not found' });
    }

    userService.deleteUserById(req.params.id);
    res.send(user);
}

module.exports = {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
