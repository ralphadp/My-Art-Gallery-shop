var express = require('express');
const controller = require('../controllers/rootController');
var router = express.Router();

/* GET home route. */
router.get('/', controller.rootResponser);

module.exports = router;
