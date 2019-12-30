const fs = require('fs');

const MAX_THUMB_PER_PAGE = 21;
/**
 * Calculate next Thumbs per page
 * @param {*} pieces 
 * @param {*} index 
 */
let calculateThumbPerPage = (pieces, index) => {
    const MIN = (index - 1) * MAX_THUMB_PER_PAGE;
    const MAX = (pieces.length < MAX_THUMB_PER_PAGE) ? pieces.length : ((pieces.length < MIN + MAX_THUMB_PER_PAGE) ? pieces.length : MIN + MAX_THUMB_PER_PAGE);

    return {
        MIN,
        MAX
    };
}

/**
 * Get the number of pages to use
 * @param {*} totalSize 
 */
let numPages = (totalSize) => {

    let wholePart = Math.trunc(totalSize / MAX_THUMB_PER_PAGE);
    const decimalPart = Math.trunc(totalSize % MAX_THUMB_PER_PAGE);

    if (decimalPart > 0) {
        wholePart++;
    }

    return wholePart;
}

/**
 * Converts an array to an object selecting the key as mapped field
 * @param {*} array 
 * @param {*} key 
 */
const arrayToObject = (array, key) => {
    const mappedField = {};
    return array.reduce((object, item) => {
      return {
        ...object,
        [item[key]]: item,
      };
    }, mappedField);
};

/**
 * Calculate buttons to show
 * @param {*} buttonsSize 
 * @param {*} index 
 */
let calculatePagerButtons = (buttonsSize, index) => {

    let buttons = [];

    if (buttonsSize <= 7) {
        for (let index = 1; index <= buttonsSize; index++) {
            buttons.push(index);
        }

        return buttons;
    }

    //TODO: do it from DB or REDIS
    let groups = JSON.parse(fs.readFileSync('../tests/mockdata/buttons-group-mock.json'));
    let group1 = groups.group1;
    let group2 = groups.group2;

    if (index === 1)  {
        group1 = [1, 2, 3];
        buttons = [...group1, '...', ...group2];
    } else if (index === 2) {
        group1 = [1, 2, 3];
        buttons = [...group1, '...', ...group2];
    } else if (index >= 3 && index < group2[0] - 1) {
        group1 = ['<', index - 1, index, index + 1];
        buttons = [...group1, '...', ...group2];
    }

    if (index === buttonsSize)  {
        group2 = [index - 2, index - 1, index];
        buttons = [...group1, '...', ...group2];
    } else if (index === buttonsSize - 1) {
        group2 = [index - 1, index, index + 1];
        buttons = [...group1, '...', ...group2];
    } else if (index <= buttonsSize - 2 && index > group1[2] + 1) {
        group2 = [index - 1, index, index + 1, '>'];
        buttons = [...group1, '...', ...group2];
    }

    groups.group1 = group1;
    groups.group2 = group2;
    fs.writeFileSync('../tests/mockdata/buttons-group-mock.json', JSON.stringify(groups, null, 4));

    return buttons;
}

/**
 * Removes the - character of the category code with space
 * @param {*} path 
 */
const fromCategoryPathToCategoryName = (path) => {
    return path.replace(/-/g, " ");
};

/**
 * Split an array ig groups of size set by chunkSize
 * @param {*} array 
 * @param {*} chunkSize 
 */
function chunk(array, chunkSize) {
    if (!(array instanceof Array)) {
        return array;
    }

    var results = [];

    while (array.length) {
        results.push(
            array.splice(
                0, 
                chunkSize
            )
        );
    }
    
    return results;
}

module.exports = {
    MAX_THUMB_PER_PAGE,
    calculateThumbPerPage,
    numPages,
    arrayToObject,
    calculatePagerButtons,
    fromCategoryPathToCategoryName,
    chunk
};