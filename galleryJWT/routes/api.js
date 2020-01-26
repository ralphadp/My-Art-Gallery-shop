var express = require('express');
const controller = require('../controllers/apiController');
var router = express.Router();

/* GET root route api. */
router.get('/', controller.rootResponser);

/* GET validate token route api. */
router.get('/check/:token', controller.verifyTokenHealth);

/* GET validate token authentication & returning user data, route api. */
router.get('/check-auth/:token', controller.verifyTokenHealthObject);

/* GET generate token route api. */
router.get('/generate/:username/expiration/:hours', controller.generateTokenByUser);

/* POST generate token route api. */
router.post('/generate-by-info', controller.generateTokenByUserInfo);

module.exports = router;
