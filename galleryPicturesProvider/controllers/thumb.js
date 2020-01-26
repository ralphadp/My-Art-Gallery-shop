const services = require('../model/servicesPath');
var handler = require('../model/thumbHandler');
var uploader = require('../model/upload');

/**
 * Send image: Type, Id, together data
 * @param {*} res 
 */
function sendImageData(req, res, image) {
    res.setHeader('Content-Type', image.type);
    res.setHeader('Picture-Id', req.params.id);
    res.send(image.data);
}

/**
 * Closure to check images upload results
 * @param {*} typeUpload 
 * @param {*} mapImages 
 * @param {*} allowedHost 
 */
function checker(typeUpload, mapImages, allowedHost) {
    let message = '';
    let anErrorHappened = false;
    let files = [];
    let imageCode = 'unknown';
    let result = {};

    /**
     * Commonly Admin use 
     * @param {*} req 
     */
    const fetchFilesResult = (req) => {
        if (req.files === undefined || !req.files) {
            message = 'No any images were provided to upload.';
            anErrorHappened = true;
        } else {
            message = 'Files uploaded sucessfully';
            files = req.files.map(mapImages);
        }

        return {
            message: message,
            error: anErrorHappened,
            files: files,
            type: typeUpload
        }
    }

    /**
     * Register new account use
     * @param {*} req 
     */
    const fetchFileResult = (req) => {
        if (req.file === undefined || !req.file) {
            message = 'None image was provided to upload.';
            anErrorHappened = true;
        } else {
            message = 'File uploaded sucessfully';
            //save the image code
            imageCode = req.file.filename.split('.')[0];
        }

        return {
            message: message,
            result: !anErrorHappened,
            code: imageCode
        }
    }

    /**
     * Main upload checker function
     * @param {*} fetchResult 
     */
    const uploadCheck = (fetchResult) => {
        return (req, res, error) => {

            if (req.fileValidationError !== undefined) {
                result.message = req.fileValidationError;
                result.anErrorHappened = true;
            } else if (error) {
                result.message = error;
                result.anErrorHappened = true;
            } else {
                result = fetchResult(req);
            }

            res.header("Access-Control-Allow-Origin", allowedHost);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            res.send(result);
        };
    }

    return {
        uploadImagesCheck: uploadCheck(fetchFilesResult),
        uploadImageCheck: uploadCheck(fetchFileResult)
    };
}

const rootResponse = (req, res, next) => {
    res.send('api root not valid.');
}

const imagesSumary = (req, res, next) => {
    const imagesCodes = handler.getAllImagesCodes();
    res.send(imagesCodes);
}

const getImageById = (req, res, next) => {
    const image = handler.getImage(req.params.id);
    sendImageData(req, res, image);
}

const getUserImageById = (req, res, next) => {
    const image = handler.getUserImage(req.params.id);
    sendImageData(req, res, image);
}

const getAdminImageById = (req, res, next) => {
    const image = handler.getAdminImage(req.params.id);
    sendImageData(req, res, image);
}

const getLargeImageById = (req, res, next) => {
    const image = handler.getHDImage(req.params.id);
    sendImageData(req, res, image);
}

const getFormTest = (req, res, next) => {
    res.sendFile('index.html', { root: './private/test' });
}

const deleteImageById = (req, res, next) => {
    handler.deleteImages(req.params.id, (result) => {
        res.send(result);
    });
}

const deleteLargeImageById = (req, res, next) => {
    handler.deleteHDImages(req.params.id, (result) => {
        res.send(result);
    });
}

const formUpload = (req, res, next) => {
    const check = checker(
        'gallery',
        (item) => {
            //resize the current HD file
            handler.imageResize(item.filename, item.buffer);
            //save the filename in the array response
            return item.filename;
        },
        services.adminHost
    );

    uploader.upload(req, res, (error) => {
        check.uploadImagesCheck(req, res, error);
    });
}

const userFormUpload = (req, res, next) => {
    const check = checker(
        'user',
        (item) => {
             //save the filename in the array response
             return item.filename;
        },
        services.adminHost
    );

    uploader.uploadUser(req, res, (error) => {
        check.uploadImagesCheck(req, res, error);
    });
}

const adminFromUpload = (req, res, next) => {
    const check = checker(
        'admin',
        (item) => {
             //save the filename in the array response
             return item.filename;
        },
        services.adminHost
    );

    uploader.uploadAdmin(req, res, (error) => {
        check.uploadImagesCheck(req, res, error);
    });
}

const registerFormUpload = (req, res, next) => {
    const check = checker(
        'register',
        null,
        services.appHost
    );

    uploader.uploadUserSingle(req, res, (error) => {
        check.uploadImageCheck(req, res, error);
    });
}

module.exports = {
    rootResponse: rootResponse,
    imagesSumary: imagesSumary,
    getImageById: getImageById,
    getLargeImageById: getLargeImageById,
    getUserImageById: getUserImageById,
    getAdminImageById: getAdminImageById,
    getFormTest: getFormTest,
    deleteImageById: deleteImageById,
    deleteLargeImageById: deleteLargeImageById,
    formUpload: formUpload,
    userFormUpload: userFormUpload,
    adminFromUpload: adminFromUpload,
    registerFormUpload: registerFormUpload
};