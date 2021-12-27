const conexion = require("../database/conexion");
const bcryptjs = require('bcryptjs');

class AdminController {

    admin(req, res) {
        conexion.query('SELECT * FROM users', (error, resultsUsers) => {
            if (error) {
                console.log(error);
            } else {
                conexion.query('SELECT * FROM events', (error, resultsEvents) => {
                    if (error) {
                        console.log(error);
                    } else {
                        conexion.query('SELECT * FROM blogs', (error, resultsBlogs) => {
                            res.render('layouts/home', {
                                title: 'Panel administrador',
                                Users: resultsUsers,
                                Events: resultsEvents,
                                Blogs: resultsBlogs
                            })
                        })
                    }
                })

            }
        })
    }

    // This is the users codes
    users(req, res) {
        conexion.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render('layouts/users', {
                    title: 'users || Panel Administrador',
                    Users: results
                });
            }
        });
    }
    addUser(req, res) {
        res.render('layouts/addUser', {
            title: 'Agregar Usuario || Panel Administrador'
        });
    }

    async createUser(req, res) {
        console.log("Se ejecuto");
        const { email, name, rol, password } = req.body;

        // to lowercase
        email.toLowerCase();
        name.toLowerCase();
        rol.toLowerCase();

        // Hashing the password
        const passwordHaash = await bcryptjs.hash(password, 8);

        // Insert Data.
        conexion.query('INSERT INTO users SET ?', { email: email, name: name, password: passwordHaash, rol: rol }, async error => {
            if (error) {
                console.log(error);
            } else {
                console.log("Se ejecuto");
                return res.redirect('/users');
            }
        })
    }

    editUser(req, res) {
        const id = req.query.id;

        conexion.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                const name = results.name;
                res.render('layouts/editUser', {
                    title: `Editando a ${name} || Panel Administrador`,
                    user: results[0]
                })
            }
        })
    }
    updateUser(req, res) {
        const { id, email, name, rol } = req.body;
        email.toLowerCase();

        conexion.query('UPDATE users SET ? WHERE id = ?', [{ email: email, name: name, rol: rol }, id], error => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/users');
            }
        })
    }
    deleteUser(req, res) {
            const id = req.params.id;
            conexion.query('DELETE FROM users WHERE id = ?', [id], error => {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('/users');
                }
            })

        }
        //  This is the blogs codes.
    blogs(req, res) {
        conexion.query('SELECT * FROM blogs', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render('layouts/blogs', {
                    title: "Blogs || Panel Administrador",
                    blogs: results
                });
            }
        });
    }

    addBlog(req, res) {
        res.render('layouts/addBlog', {
            title: "Agregar Blog || Panel Administrador"
        });
    }
    createBlog(req, res) {
        const title = req.body.title;
        const { destination, filename } = req.file;

        const imagePath = destination.slice(7, 17);
        console.log(imagePath);
        const save = imagePath.concat(`/${filename}`);
        const description = req.body.description;
        const short_description = description.substring(0, 93);


        conexion.query("INSERT INTO blogs SET ?", { title: title, image: save, description: description, short_description: short_description }, error => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/blogsAdmin');
            }
        })
    }

    editBlog(req, res) {
        const id = req.query.id;
        conexion.query('SELECT * FROM blogs WHERE id = ?', [id], (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.render('layouts/editBlog', {
                    title: 'Editando Blog || Panel Administrador',
                    blog: result
                })
            }
        })
    }
    updateBlog(req, res) {
        const id = req.body.id;
        const title = req.body.title;
        const { destination, filename } = req.file;
        const imagePath = destination.slice(7, 13);
        const save = imagePath.concat(`/${filename}`);
        const description = req.body.description;
        const short_description = description.substring(0, 93);
        conexion.query('UPDATE blogs SET ? WHERE id = ?', [{ title: title, image: save, description: description, short_description: short_description }, id], error => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/blogsAdmin');
            }
        })
    }
    deleteBlog(req, res) {
        const id = req.params.id;
        conexion.query('DELETE FROM blogs WHERE id = ?', [id], error => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/blogsAdmin');
            }
        })
    }


    //  This is the events codes.
    events(req, res) {
        conexion.query('SELECT * FROM events', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render('layouts/events', {
                    title: "Eventos || Panel Administrador",
                    events: results
                });
            }
        });
    }

    addEvent(req, res) {
        res.render('layouts/addEvent', {
            title: "Crear Evento || Panel Administrador"
        });
    }
    create_event(req, res) {
        const title = req.body.title;
        // console.log(req.file);

        // OBTENER DATOS DE LA IMAGEN SUBIDA
        const { destination, filename } = req.file;

        const imagePath = destination.slice(7, 13);
        // const imagePath = destination.concat(`/${filename}`);
        const save = imagePath.concat(`/${filename}`);


        const description = req.body.description;
        const short_description = description.substring(0, 93);
        const fecha = req.body.date;
        const hora = req.body.time;
        // console.log(title, description, short_description);
        conexion.query("INSERT INTO events SET ?", { title: title, image: save, description: description, short_description: short_description, fecha: fecha, hora: hora }, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/events');
            }
        })
    }

    editEvent(req, res) {
        const id = req.query.id;
        conexion.query('SELECT * FROM events WHERE id=?', [id], (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.render('layouts/editEvent', {
                    title: 'Admin Panel || Edit event',
                    event: result[0]
                })
            }
        })
    }
    updateEvent(req, res) {
        const id = req.body.id;
        const title = req.body.title;
        // OBTENER DATOS DE LA IMAGEN SUBIDA
        const { destination, filename } = req.file;
        const imagePath = destination.slice(7, 13);
        // const imagePath = destination.concat(`/${filename}`);
        const save = imagePath.concat(`/${filename}`);
        const description = req.body.description;
        const short_description = description.substring(0, 20);
        conexion.query('UPDATE events SET ? WHERE id = ?', [{ title: title, image: save, description: description, short_description: short_description }, id], (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/events');
            }
        })

    }
    deleteEvent(req, res) {
        const id = req.params.id;
        conexion.query('DELETE FROM events WHERE id = ?', [id], (error, result) => {
            if (error) {
                console.log(error);
            } else {
                // console.log(result)
                res.redirect('/events');
            }
        });

    }
}
module.exports = new AdminController();