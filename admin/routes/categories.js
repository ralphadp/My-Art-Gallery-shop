var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const controller = require('../controllers/categoryController');
var router = express.Router();

/* GET categories listing. */
router.get('/', tokenCheck, controller.getCategories);

/* GET categories 'add'. */
router.get('/add', tokenCheck, controller.categoryAddForm);

/* POST categories 'save'. */
router.post('/save', tokenCheck, controller.saveCategory);

/* POST categories 'update'. */
router.post('/update', tokenCheck, controller.updateCategory);

/* GET categories load to update. */
router.get('/edit/:id/:path/:name', tokenCheck, controller.getCategoryData);

/* POST categories 'delete'. */
router.post('/delete', tokenCheck, controller.deleteCategory);

/* GET categories 'search'. */
router.get('/search/:textPattern', tokenCheck, controller.searchCategory);

module.exports = router;
