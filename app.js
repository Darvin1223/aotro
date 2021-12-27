const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path : __dirname + '/env/' + process.env.NODE_ENV + '.env'});
const session = require('express-session');
const conexion = require('./database/conexion');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const { homeRoutes, AdminRoutes } = require('./routers');


// Middleware
app.set('port', process.env.PORT || 3000)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Setting the engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


app.use(expressLayouts);
app.set('layout', 'layouts/layout');
// using routes.

app.use(
    session({
        secret: 'secrect',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(homeRoutes, AdminRoutes);
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hay un error en el servidor');
});

//Iniciando Servidor
// const PORT = process.env.PORT || 4410;


// esto no es recomendable, lo puedes hacer de 2 formas mira

app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});