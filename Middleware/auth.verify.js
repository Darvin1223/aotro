const verifyLoggedIn = (req, res, next) => {
    const { loggedin, name } = req.session;
    if (loggedin === true && (name === 'Administrador' || name === "administrador" || name === "ADMINISTRADOR")) {
        return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = verifyLoggedIn;