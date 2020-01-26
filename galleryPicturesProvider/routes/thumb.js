var express = require('express');
const controller = require('../controllers/thumb');
var router = express.Router();

/* GET api root not valid. */
router.get('/', controller.rootResponse);

/* GET all thumbs listed into a json array. */
router.get('/summary', controller.imagesSumary);

/* GET thumb by ID service. */
router.get('/image/:id', controller.getImageById);

/* GET user thumb by ID service. */
router.get('/image/user/:id', controller.getUserImageById);

/* GET admin thumb by ID service. */
router.get('/image/admin/:id', controller.getAdminImageById);

/* GET thummb large HD by ID service. */
router.get('/image-large/:id', controller.getLargeImageById);

/* POST to upload thummb service. */
router.post("/form/upload", controller.formUpload);

/* GET upload test route. */
router.get('/form/test', controller.getFormTest);

/* POST to upload user thumb service. */
router.post("/userform/upload", controller.userFormUpload);

/* POST to upload admin thumb service. */
router.post("/adminform/upload", controller.adminFromUpload);

/* POST to upload user photo from signin. */
router.post("/register/upload", controller.registerFormUpload)

/*DELETE remove images from images directory */
router.delete('/image/:id', controller.deleteImageById);

/*DELETE remove images large from images/HD directory */
router.delete('/image-large/:id', controller.deleteLargeImageById);

module.exports = router;
