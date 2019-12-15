var express = require('express');
var handler = require('../model/thumbHandler');
var upload = require('../model/upload');
var router = express.Router();

/* GET api root not valid. */
router.get('/', function(req, res, next) {

  res.send('api root not valid');
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
        if (error) {
            return res.end("Something went wrong! " + error);
        }
        return res.end("File uploaded sucessfully!.");
    });

});

/* GET upload test route. */
router.get('/form/test', function(req, res, next) {

  res.sendFile('index.html', { root: './private' });
});


module.exports = router;
