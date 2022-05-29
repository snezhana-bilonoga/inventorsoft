const { Router } = require('express');
const { check } = require('express-validator');

const authController = require('../controller/authController');

const router = Router();

router.post(
    '/register',
    [
        check('email', 'Not correct email').isEmail(),
        check('password', 'Minimum password length 6 symbol').isLength({
            min: 6,
        }),
    ],
    authController.registerUser
);

router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists(),
    ],
    authController.loginUser
);

module.exports = router;
