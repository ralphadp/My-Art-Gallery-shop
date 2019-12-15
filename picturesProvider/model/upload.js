var path = require('path');
var uuidv1 = require('uuid/v1');//or v4
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './private/images/HD');
    },
    filename: (req, file, callback) => {
        callback(null, uuidv1() + path.extname(file.originalname));
    }
});
  
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
}).array("imgUploader", 3); //Field name, 3 as max

module.exports = upload;