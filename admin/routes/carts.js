var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const controller = require('../controllers/cartController');
var router = express.Router();

/* GET Carts listing. */
router.get('/', tokenCheck, controller.getCarts);

/* GET Carts 'statistics'. */
router.get('/statistics', tokenCheck, controller.getStatistics);

module.exports = router;
