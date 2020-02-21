var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const controller = require('../controllers/orderController');
var router = express.Router();

/* GET Orders listing. */
router.get('/transactions', tokenCheck, controller.getTransactions);

module.exports = router;
