const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const controller = require('../controllers/usuariosController');

const validateRegister = [
    check('first_name')
    .notEmpty().withMessage('Debes completar el nombre').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    check('last_name')
    .notEmpty().withMessage('Debes completar el apellido').bail()
    .isLength({ min: 5 }).withMessage('El apellido debe tener al menos 5 caracteres'),

    check('email')
    .notEmpty().withMessage('Debes completar el email').bail()
    .isLength().withMessage('Debes ingresar un email válido'),

    check('password')
    .notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
];

router.get('/register', validateRegister, controller.register); 
router.post('/register', validateRegister, controller.register);

module.exports = router;