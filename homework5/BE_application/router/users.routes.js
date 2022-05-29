const { Router } = require('express');
const { check } = require('express-validator');

const authMiddleware = require('../middleware/auth.middleware');
const userController = require('../controller/userController');

const router = Router();

router.use(authMiddleware);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put(
    '/:id',
    [
        check('email', 'Not correct email').isEmail(),
        check('password', 'Minimum password length 6 symbol').isLength({
            min: 6,
        }),
    ],
    userController.updateUserById
);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
