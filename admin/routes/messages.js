var express = require('express');
var Util = require('../model/util');
var router = express.Router();

/* GET checking and saving for message readed. */
router.get('/reading/:code', function(req, res, next) {
    const CODE = req.params.code;

    Util.getValueOfStorage(CODE, (value) => {
        if (Number(value) === 0) {
            Util.changeValueInStorage(CODE, 1, 
            (result) => {
                Util.getValueOfStorage(
                    'READED_MESSAGES_COUNTER', 
                    (messagesCount) => {
                        if (messagesCount === 'empty') {
                            /*TODO: DIDN'T found the READED_MESSAGES_COUNTER, Is Ok added from here??? */
                            Util.setValueInStorage('READED_MESSAGES_COUNTER', 1,
                            (result) => {
                                global.currentEmailCounter--;
                                res.send({message:'message readed and couter updated', result: true, unreaded: global.currentEmailCounter});
                            },
                            (error) => {
                                res.send({message: error, result: false});
                            });
                        } else {
                            Util.changeValueInStorage('READED_MESSAGES_COUNTER', Number(messagesCount) + 1,
                                (result) => {
                                    global.currentEmailCounter--;
                                    res.send({message:'message readed and couter updated', result: true, unreaded: global.currentEmailCounter});
                                },
                                (error) => {
                                    res.send({message: error, result: false});
                                });
                        }
                    },
                    (error) => {
                        res.send({message: error, result: false});
                    }
                );
            },
            (error) => {
                res.send({message: error, result: false});
            });
        } else {
            res.send({message: `Message ${CODE} already readed`, result: false});
        }
    });
    
});

module.exports = router;
