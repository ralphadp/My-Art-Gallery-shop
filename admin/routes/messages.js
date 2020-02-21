var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const controller = require('../controllers/messagesController');
var router = express.Router();

/* GET checking and saving for message readed. */
router.get('/reading/:code', tokenCheck, controller.updateMessagesCounter);

module.exports = router;
