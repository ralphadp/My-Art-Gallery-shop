var express = require('express');
var tokenCheck = require('../model/tokenCheck');
const controller = require('../controllers/pieceController');
var router = express.Router();

/* GET pieces listing. */
router.get('/', tokenCheck, controller.getPieces);

/* GET pieces 'add'. */
router.get('/add', tokenCheck, controller.addPiece);

/* POST pieces 'save'. */
router.post('/save', tokenCheck, controller.savePiece);

/* GET pieces 'edit'. */
router.get('/edit/:id', tokenCheck, controller.editPiece);

/* POST pieces 'update'. */
router.post('/update', tokenCheck, controller.updatePiece);

/* POST pieces 'delete'. */
router.post('/delete', tokenCheck, controller.deletePiece);

/* GET pieces 'search'. */
router.get('/search/:textPattern', tokenCheck, controller.searchPiece);

module.exports = router;
