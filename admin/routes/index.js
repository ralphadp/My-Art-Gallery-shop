var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const controller = require('../controllers/rootController');
var router = express.Router();

/* GET login page. */
router.get('/login', controller.login);

/* POST verification route. */
router.post('/login/verification', controller.loginVerify);

/* GET login page. */
router.get('/logout', tokenCheck, controller.logout);

/* GET home page. */
router.get('/', tokenCheck, controller.index);

/* GET documents page. */
router.get('/documents', tokenCheck, controller.getDocuments);

/* GET profile page. */
router.get('/profile', tokenCheck, controller.getProfile);

/* GET messages page. */
router.get('/messages', tokenCheck, controller.getIncomingMessages);

/* GET configuration page. */
router.get('/configuration', tokenCheck, controller.getConfiguration);

/* GET update configuration. */
router.post('/configuration/update', tokenCheck, controller.configurationUpdate);

module.exports = router;
