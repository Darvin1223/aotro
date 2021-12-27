const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


conexion.connect((error) => {
    if (error) {
        console.log(error);
    }
})

module.exports = conexion;