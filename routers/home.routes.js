const router = require('express').Router();

const { HomeController } = require('../controllers');
const { AuthController } = require('../controllers');


//
router.get('/',HomeController.index);
router.get('/lider', HomeController.lider);
router.get('/negocios', HomeController.negocios);
router.get('/neuromarketing', HomeController.neuromarketing);
router.get('/gestion', HomeController.gestion);
router.get('/programa', HomeController.programa);
router.get('/login', HomeController.login);
router.get('/register', HomeController.register);
router.get('/blogs', HomeController.blogs);
router.get('/evets', HomeController.evets);
router.get('/contacto', HomeController.contacto);
router.get('/blogOne', HomeController.showOneBlog);
router.get('/eventOne', HomeController.showOneEvent);


// Post
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;