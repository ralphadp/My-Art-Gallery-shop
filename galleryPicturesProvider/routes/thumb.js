var express = require('express');
var handler = require('../model/thumbHandler');
var uploader = require('../model/upload');
const {REMOTE_REQUESTER_HOST, REMOTE_REQUESTER_APP_HOST} = require('../model/config');
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

/* GET user thumb by ID service. */
router.get('/image/user/:id', function(req, res, next) {

  const image = handler.getUserImage(req.params.id);
  
  res.setHeader('Content-Type', image.type);
  res.setHeader('Picture-Id', req.params.id);
  res.send(image.data);
});

/* GET admin thumb by ID service. */
router.get('/image/admin/:id', function(req, res, next) {

  const image = handler.getAdminImage(req.params.id);
  
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
  console.log(REMOTE_REQUESTER_HOST);
  uploader.upload(req, res, (error) => {
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

        //TODO: set the requester microservice domain in the configuration
        res.header("Access-Control-Allow-Origin", REMOTE_REQUESTER_HOST);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.send({
            message: message,
            error: anErrorHappened,
            files: files,
            type: 'gallery'
        });
    });
});

/* GET upload test route. */
router.get('/form/test', function(req, res, next) {

  res.sendFile('index.html', { root: './private/test' });
});

/* POST to upload user thumb service. */
router.post("/userform/upload", function(req, res) {
  console.log(REMOTE_REQUESTER_HOST);
  uploader.uploadUser(req, res, (error) => {
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
              //save the filename in the array response
              return item.filename;
            });
          }
      }

      //TODO: set the requester microservice domain in the configuration
      res.header("Access-Control-Allow-Origin", REMOTE_REQUESTER_HOST);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      res.send({
          message: message,
          error: anErrorHappened,
          files: files,
          type: 'user'
      });
  });
});

/* POST to upload admin thumb service. */
router.post("/adminform/upload", function(req, res) {
console.log(REMOTE_REQUESTER_HOST);
  uploader.uploadAdmin(req, res, (error) => {
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
                //save the filename in the array response
                return item.filename;
              });
          }
      }

      //TODO: set the requester microservice domain in the configuration
      res.header("Access-Control-Allow-Origin", REMOTE_REQUESTER_HOST);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      res.send({
          message: message,
          error: anErrorHappened,
          files: files,
          type: 'admin'
      });
  });
});

/* POST to upload user photo from signin. */
router.post("/register/upload", function(req, res) {

  uploader.uploadUserSingle(req, res, (error) => {
      let message = '';
      let anErrorHappened = false;
      let code = 'unknown';

      if (req.fileValidationError !== undefined) {
          message = req.fileValidationError;
          anErrorHappened = true;
      } else if (error) {
          message = error;
          anErrorHappened = true;
      } else {
          if (req.file === undefined || !req.file) {
              message = 'None image was provided to upload.';
              anErrorHappened = true;
          } else {
            message = 'Files uploaded sucessfully';
            //save the image code
            code = req.file.filename.split('.')[0];
          }
      }

      //TODO: set the requester microservice domain in the configuration
      res.header("Access-Control-Allow-Origin", REMOTE_REQUESTER_APP_HOST);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      res.send({
          message: message,
          result: !anErrorHappened,
          code: code
      });
  });
})

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
