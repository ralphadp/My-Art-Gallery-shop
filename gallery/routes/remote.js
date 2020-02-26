var express = require('express');
var optionsUpdate = require('../model/optionsUpdate');
var router = express.Router();

/* GET app config update */
router.get('/update-config', async function(req, res, next) {

    let result = false;
    try {
        result = await optionsUpdate();
        res.send({
            success: result,
            message: 'Request for change received'
        });
    } catch(error) {
        res.send({
            success: result,
            message: error
        });
    }
   
});

module.exports = router;
