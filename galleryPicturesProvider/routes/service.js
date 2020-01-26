var express = require('express');
const controller = require('../controllers/responser');
var router = express.Router();

/* GET root service. */
router.get('/', controller.rootResponser);

module.exports = router;
