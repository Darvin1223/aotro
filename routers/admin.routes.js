const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const verifyLoggedIn = require('../Middleware/auth.verify');
const { AdminController } = require('../controllers');

const storage = multer.diskStorage({
    destination: 'public/upload',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
const storageCol = multer.diskStorage({
    destination: 'public/uploadBlog',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})

const uploadConfig = multer({
    storage: storage,
    dest: 'public/upload'
});
const uploadBlog = multer({
    storage: storageCol,
    dest: 'public/uploadBlog'
});


// Gets
router.get('/admin', verifyLoggedIn, AdminController.admin);
router.get('/users', verifyLoggedIn, AdminController.users);
router.get('/addUser', verifyLoggedIn, AdminController.addUser);
router.get('/edit-user', verifyLoggedIn, AdminController.editUser);
router.get('/delete-user/:id', verifyLoggedIn, AdminController.deleteUser)
router.get('/events', verifyLoggedIn, AdminController.events);
router.get('/edit-event', verifyLoggedIn, AdminController.editEvent);
router.get('/blogsAdmin', verifyLoggedIn, AdminController.blogs);
router.get('/addBlog', verifyLoggedIn, AdminController.addBlog);
router.get('/eventsAdmin', verifyLoggedIn, AdminController.events);
router.get('/addevent', verifyLoggedIn, AdminController.addEvent);
router.get('/delete-event/:id', verifyLoggedIn, AdminController.deleteEvent);
router.get('/delete-blog/:id', verifyLoggedIn, AdminController.deleteBlog);


// Posts
router.post('/create-user', verifyLoggedIn, AdminController.createUser);
router.post('/update-user', verifyLoggedIn, AdminController.updateUser);
router.post('/create-event', uploadConfig.single('image'), AdminController.create_event);
router.post('/create-blog', uploadBlog.single('image'), verifyLoggedIn, AdminController.createBlog);
module.exports = router;