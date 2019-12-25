var express = require('express');
var handler = require('../model/thumbHandler');
var upload = require('../model/upload');
var router = express.Router();

/* GET api root not valid. */
router.get('/', function(req, res, next) {

  res.send('api root not valid.');
});

/* GET all thumbs listed into a json array. */
router.get('/summary', function(req, res, next) {

  const images = handler.getAllImagesCodes();

  res.send(images);
});

/* GET thumb by ID service. */
router.get('/image/:id', function(req, res, next) {

  const image = handler.getImage(req.params.id);
  
  res.setHeader('Content-Type', image.type);
  res.setHeader('Picture-Id', req.params.id);
  res.send(image.data);
});

/* GET thummb large HD by ID service. */
router.get('/image-large/:id', function(req, res, next) {

  const image = handler.getHDImage(req.params.id);

  res.setHeader('Content-Type', image.type);
  res.setHeader('Picture-Id', req.params.id);
  res.send(image.data);
});

/* POST to upload thummb service. */
router.post("/form/upload", function(req, res) {

    upload(req, res, (error) => {
        let message = '';
        let anErrorHappened = false;
        let files = [];

        if (req.fileValidationError !== undefined) {
            message = req.fileValidationError;
            anErrorHappened = true;
        } else if (error) {
            message = error;
            anErrorHappened = true;
        } else {
            if (req.files === undefined || !req.files) {
                message = 'None image was provided to upload.';
                anErrorHappened = true;
            } else {
              message = 'Files uploaded sucessfully';
              files = req.files.map((item) => {
                  //resize the current HD file
                  handler.imageResize(item.filename, item.buffer);
                  //save the filename in the array response
                  return item.filename;
              });
            }
          }

          res.send({
              message: message,
              error: anErrorHappened,
              files: files
          });
    });
});

/* GET upload test route. */
router.get('/form/test', function(req, res, next) {

  res.sendFile('index.html', { root: './private' });
});

/*DELETE remove images from images directory */
router.delete('/image/:id', function(req, res, next) {

  handler.deleteImages(req.params.id, (result) => {
      res.send(result);
  });

});

/*DELETE remove images large from images/HD directory */
router.delete('/image-large/:id', function(req, res, next) {

  handler.deleteHDImages(req.params.id, (result) => {
      res.send(result);
  });

});


module.exports = router;