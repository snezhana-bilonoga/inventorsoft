const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const usersService = require('../service/users.service');

async function registerUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array(),
            message: 'Not correct registration data',
        });
    }

    const { name, email, password } = req.body;

    const candidate = usersService.getUserByEmail(email);

    if (candidate) {
        return res.status(400).send({ message: 'Such user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
    };
    usersService.addUser(user);
    res.status(201).send(user);
}

async function loginUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array(),
            message: 'Not correct login data',
        });
    }
    const { email, password } = req.body;

    const user = usersService.getUserByEmail(email);

    if (!user) {
        return res.status(400).send({ message: 'User is not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res
            .status(400)
            .send({ message: 'Not correct password, try again' });
    }

    const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
    });
    res.send({ token });
}

module.exports = { registerUser, loginUser };
