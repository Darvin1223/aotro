const conexion = require('../database/conexion');

class HomeController {
    
    index(req, res) {
		let events = [];
		let blogs = [];
		try {
			conexion.query('SELECT * FROM events', (error, resultsEvent) => {
				if (error) throw new Error(error);
				events = resultsEvent.length > 0 ? resultsEvent[0] : [];
				conexion.query('SELECT * FROM blogs', (error, resultsblogs) => {
					if (error) throw new Error(error);
					blogs = resultsblogs.length > 0 ? resultsblogs[0] : [];
					res.render('index', {
						layout: false,
						title: 'Inicio || A otro nivel latino america',
						events: events,
						blogs
					});
				});
			});
		} catch (error) {
			console.log(error);
		}
	}
    negocios(req, res) {
        res.render('negociacion', {
            title: 'negociacion || A otro nivel latino america',
            layout: false
        })
    }
    login(req, res) {
        res.render('login', {
            title: 'panel login || A otro nivel latino america',
            layout: false
        })
    }
    register(req, res) {
        res.render('register', {
            title: 'panel registro || A otro nivel latino america',
            layout: false
        })
    }
    gestion(req, res) {
        res.render('gestion_cambio', {
            title: 'gestion_cambio || A otro nivel latino america',
            layout: false
        })
    }
    neuromarketing(req, res) {
        res.render('neuromarketing', {
            title: 'neuromarketing || A otro nivel latino america',
            layout: false
        })
    }
    programa(req, res) {
        res.render('programa_desarrollo', {
            title: 'programa_desarrollo || A otro nivel latino america',
            layout: false
        })
    }
    lider(req, res) {
        res.render('lider_coach', {
            title: 'lider_coach || A otro nivel latino america',
            layout: false
        })
    }
    blogs(req, res) {
        conexion.query('SELECT * FROM blogs', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render('blogs', {
                    title: 'blogs || A otro nivel latino america',
                    layout: false,
                    blogs: results
                })
            }
        })

    }
    showOneBlog(req, res) {
        const id = req.query.id;
        conexion.query('SELECT * FROM blogs WHERE id = ?', [id], (error, result) => {

            if (error) {
                console.log(error);
            } else {

                res.render('blog-single', {
                    blog: result[0],
                    title: `${result[0].title} || A otro nivel latino America`,
                    layout: false
                })
            }
        })

    }
    evets(req, res) {
        conexion.query('SELECT * FROM events', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.render('eventos', {
                    title: 'evetos || A otro nivel latino america',
                    layout: false,
                    events: results
                })
            }
        })

    }
    showOneEvent(req, res) {
        conexion.query('SELECT * FROM events WHERE id = ?', [id], (error, result) => {

            if (error) {
                console.log(error);
            } else {

                res.render('event-single', {
                    event: result[0],
                    title: `${result[0].title} || A otro nivel latino America`,
                    layout: false
                })
            }
        })
    }
    contacto(req, res) {
        res.render('contacto', {
            title: 'contacto || A otro nivel latino america',
            layout: false
        })
    }

}

module.exports = new HomeController();