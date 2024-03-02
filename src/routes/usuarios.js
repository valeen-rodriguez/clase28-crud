const express = require('express');
const router = express.Router();
const {register, accountRegister} = require('../controllers/usuariosController');
const validateRegister = require('../validations/registerValidate');

router.get('/register', register);
router.post('/register', validateRegister, accountRegister);

module.exports = router;