var path = require('path');
var uuidv4 = require('uuid/v4');
var multer = require('multer');
const {
    IMAGES_HD_PATH,
    IMAGES_USER_PATH,
    IMAGES_ADMIN_PATH
} = require('./config');


/**
 * Check the file type before to process it
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
 * Main function to upload images
 * @param {*} storagePath 
 */
let imagesUpload = (storagePath, single = false) => {

    /**
     * Reference of multer disk Storage
     */
    var storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, storagePath);
        },
        filename: (req, file, callback) => {
            callback(null, uuidv4() + path.extname(file.originalname));
        }
    });

    if (single) {
        /**
         * return instance multer for a sinle file
         */
        return multer({
            storage: storage,
            fileFilter: imageFilter,
            /*limits: {
                //TODO: need to control to be a big image (how to check if is high resolution?, npm )
                fileSize: 100 * 1024 * 1024,//100kb
            }*/
        }).single("imgUploader");
    }

    /**
     * return instance multer for multiple files
     */
    return multer({
        storage: storage,
        fileFilter: imageFilter,
        /*limits: {
            //TODO: need to control to be a big image (how to check if is high resolution?, npm )
            fileSize: 100 * 1024 * 1024,//100kb
        }*/
    }).array("imgUploader", 3); //attribute 'name' on HTML, max files allowed, 3

};

module.exports = {
    upload: imagesUpload(IMAGES_HD_PATH),
    uploadUser: imagesUpload(IMAGES_USER_PATH),
    uploadAdmin: imagesUpload(IMAGES_ADMIN_PATH),
    uploadUserSingle: imagesUpload(IMAGES_USER_PATH, true)
};