const { validationResult } = require('express-validator');

const usuariosController = {
    register: (req,res) => {
        res.render("register", {title: "Crear Cuenta"});
    },
    accountRegister: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
        res.redirect('/');
    } else {
        res.render('register', { errors: errors.mapped(), old: req.body });
    }
}
}
module.exports = usuariosController;