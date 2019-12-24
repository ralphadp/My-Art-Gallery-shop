const fs = require('fs');
const sharp = require('sharp');
const sizeOfImage = require('image-size');

const IMAGES_PATH = './private/images/';
const IMAGES_HD_PATH = './private/images/HD/';
const SMALL_IMAGE_SIZE_PERCENTAGE = 0.3;

const mine = {
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
};

/**
 * Verify and set the complete path and returnr the image type
 * @param {*} filepath 
 * @param {*} id 
 */
const verifyFilepath = (filepath, id) => {
    let file = '';

    for (key in mine) {
        file = `${filepath}${id}.${key}`;
        if (fs.existsSync(file)) {
            return {
                file: file,
                type: key,
                found: true
            };
        }
    }

    //not-found png image is returned
    return {
        file: `${IMAGES_PATH}not-found.png`,
        type: 'png',
        found: false
    };
    //throw new Error('exttype or file not found.');
}

/**
 * Read syncronously an image
 * @param {*} file 
 */
const queryImage = (file) => {
    try {
        return fs.readFileSync(file);
    } catch(error) {
        console.log(error);
        if (error.code === 'ENOENT') {
            return fs.readFileSync(`${IMAGES_PATH}not-found.png`);
        } else {
            throw error;
        }
    }
}

/**
 * return all the files codes from dirpath, excluding the dirs
 * @param {*} dirpath 
 */
function readFilesFromDir(dirpath) {

    try {
        let files = fs.readdirSync(dirpath);

        return files
            .filter(element => !fs.lstatSync(dirpath + element).isDirectory())
            .map(element => element.split('.')[0]);

    } catch(error) {
        console.log(error);
    }
    
  };

/**
 * Curry function to fetch the image content
 * @param {*} filepath 
 */
const imageReader = (filepath) => {

    return (ID) => {

        const result = verifyFilepath(filepath, ID);

        return {
            type: mine[result.type],
            data: queryImage(result.file)
        };
    }
};

/**
 * Resize upload file according the SMALL_IMAGE_SIZE_PERCENTAGE
 * @param {*} destinationFilePath 
 */
const imageResize = (destinationFilePath, sourceFilePath) => {

    return (filename) => {
        try {

            const fileImagePath = `${sourceFilePath}/${filename}`;
            const imageContent = fs.readFileSync(fileImagePath);

            if (filename === undefined || !filename) {
                console.log('No filename.');
                return;
            }

            if (imageContent === undefined || !imageContent) {
                console.log('No content.');
                return;
            }
            
            const dimensions = sizeOfImage(fileImagePath);
            const width = Math.floor(dimensions.width * SMALL_IMAGE_SIZE_PERCENTAGE);
            const height = Math.floor(dimensions.height * SMALL_IMAGE_SIZE_PERCENTAGE);

            sharp(imageContent)
            .resize(
                width,
                height,
                {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                }
            )
            .toFile(`${destinationFilePath}/${filename}`);

            console.log(`The new dimmensions: ${width}x${height}`);

        } catch(error) {
            console.log(error);
            throw error;
        }
    };
}

/**
 * Delete images from both dire4ctories.
 * @param {*} imagesfilePath 
 */
const deleteImages = (imagesfilePath) => {

    return (ID, next) => {

        const result = {
            message: [],
            deleteFiles: false
        };

        const fileInfo = verifyFilepath(imagesfilePath, ID);

        if (!fileInfo.found) {
            result.message.push("The image was found.");
        } else {
            fs.unlink(fileInfo.file, (error) => {
                if (error) {
                    result.message.push(error);
                    console.log(error);
                } else {
                    result.deleteFiles = true;
                }

                next(result);
            });
        }

        next(result);
    }
};

/**
 * Get all the images filename codes from all the directories
 * @param {*} imagesfilePath 
 * @param {*} imagesHDfilePath 
 */
const getAll = (imagesfilePath, imagesHDfilePath) => {

    return () => {

        return {
            images: readFilesFromDir(imagesfilePath),
            imagesHD: readFilesFromDir(imagesHDfilePath)
        };

    }
};

module.exports = {
    getImage: imageReader(IMAGES_PATH),
    getHDImage: imageReader(IMAGES_HD_PATH),
    imageResize: imageResize(IMAGES_PATH, IMAGES_HD_PATH),
    deleteImages: deleteImages(IMAGES_PATH),
    deleteHDImages: deleteImages(IMAGES_HD_PATH),
    getAllImagesCodes: getAll(IMAGES_PATH, IMAGES_HD_PATH),
};