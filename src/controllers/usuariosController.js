const { validationResult } = require('express-validator');

const usuariosController = {
    register: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
        res.redirect('/usuarios/register');
    } else {
        res.render('register', { errors: errors.mapped(), old: req.body });
    }
}
}

module.exports = usuariosController;