const fs = require('fs');

const IMAGES_PATH = './private/images/';
const IMAGES_HD_PATH = './private/images/HD/';

const mine = {
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
};

/**
 * Verify and create the complete path and returnr the image type
 * @param {*} path 
 * @param {*} id 
 */
const createFilepath = (path, id) => {
    let file = '';

    for (key in mine) {
        file = `${path}${id}.${key}`;
        if (fs.existsSync(file)) {
            return {
                file: file,
                type: key
            };
        }
    }

    throw new Error('exttype or file not found.');
}

/**
 * Read syncronously an image
 * 
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
 * Curry function to fetch the image content
 * @param {*} path 
 */
const imageReader = (path) => {

    return (ID) => {

        const result = createFilepath(path, ID);

        return {
            type: mine[result.type],
            data: queryImage(result.file)
        };
    }
};

/**
 * Curry function to save the image into the path provided inside
 * @param {*} path 
 */
const imagesSaver = (path) => {

    return (ID, type, binary) => {
        const result = fs.writeFileSync(`${path}${ID}.${type}`, binary);
        return {
            imageId: ID,
            save: result,
        };
      
    }
};

module.exports = {
    getImage: imageReader(IMAGES_PATH),
    getHDImage: imageReader(IMAGES_HD_PATH),
    savePicture: imagesSaver(IMAGES_PATH),
    saveHDPicture: imagesSaver(IMAGES_HD_PATH)
};