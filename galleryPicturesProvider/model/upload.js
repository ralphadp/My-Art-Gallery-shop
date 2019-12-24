var path = require('path');
var uuidv4 = require('uuid/v4');
var multer = require('multer');

/**
 * check the file type before to process it
 * @param {*} request 
 * @param {*} file 
 * @param {*} callback 
 */
const imageFilter = (request, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|gif|GIF)$/))
    {
        request.fileValidationError = 'Only images are allowed';
        return callback(new Error(request.fileValidationError), false);
    }
    callback(null, true);
};

/**
 * Reference of multer disk Storage
 */
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './private/images/HD');
    },
    filename: (req, file, callback) => {
        callback(null, uuidv4() + path.extname(file.originalname));
    }
});

/**
 * instance multer
 */
var upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        //TODO: need to control to be a big image (how to check if is high resolution?, npm )
        fileSize: 100 * 1024 * 1024,//100kb
    }
}).array("imgUploader", 3); //attribute 'name' on HTML, max files allowed, 3

module.exports = upload;