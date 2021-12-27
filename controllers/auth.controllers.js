const conexion = require("../database/conexion");
const bcryptjs = require('bcryptjs');

class AuthController {
    async register(req, res) {
        const email = req.body.email.toLowerCase();
        const name = req.body.name;
        const password = req.body.password;
        const passwordHaash = await bcryptjs.hash(password, 8);
        conexion.query('INSERT INTO users SET ?', { email: email, name: name, password: passwordHaash },
            async(error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    return res.redirect('/login');
                }
            })
    }

    login(req, res) {
        const email = req.body.email.toLowerCase();
        const time = 3600000;
        const password = req.body.password;

        if (email && password) {
            conexion.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (email === false || results.length === 0) {
                    res.redirect('/login');
                } else {
                    const verifyPassword = bcryptjs.compare(password, results[0].password);
                    if (results.lenght == 0 || verifyPassword === false) {
                        // console.log(res, error);
                        // let mensaje = "Ingrese una contraseña valida";
                        res.redirect('/login')
                    } else {
                        req.session.loggedin = true;
                        req.session.cookie.expires = (new Date() + time);
                        req.session.cookie.maxAge = time;
                        req.session.name = results[0].rol;
                        return res.redirect('/admin');
                    }
                }

            });
            // conexion
        } else {
            res.send('Por favor ingrese una contraseña');
        }
    }
}

module.exports = new AuthController();