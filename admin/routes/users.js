var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const controller = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', tokenCheck, controller.getUsers);

/* GET admin listing. */
router.get('/admin', tokenCheck, controller.getAdmin);

/* GET new users form. */
router.get('/new', tokenCheck, controller.newUserForm);

/* GET new admin form. */
router.get('/admin/new', tokenCheck, controller.newAdminForm);

/* POST users 'save'. */
router.post('/save', tokenCheck, controller.saveUser);

/* POST admins 'save'. */
router.post('/admin/save', tokenCheck, controller.saveAdmin);

/* GET user 'edit'. */
router.get('/edit/:id', tokenCheck, controller.editUser);

/* POST user 'update'. */
router.post('/update', tokenCheck, controller.updateUser);

/* GET admin 'edit'. */
router.get('/admin/edit/:id', tokenCheck, controller.editAdmin);

/* POST admin 'update'. */
router.post('/admin/update', tokenCheck, controller.updateAdmin);

/* POST users 'delete'. */
router.post('/delete', tokenCheck, controller.deleteUser);

/* POST admin 'delete'. */
router.post('/admin/delete', tokenCheck, controller.deleteAdmin);

/* GET users 'search'. */
router.get('/search/:textPattern', tokenCheck, controller.searchUsers);

/* GET admin 'search'. */
router.get('/admin/search/:textPattern', tokenCheck, controller.updateAdmin);


module.exports = router;
