const fs = require('fs');

/**
 * Getting all info for the 'pieces thumbs' and 'categories' pages
 * TODO: It has 4 concerns, need to be separated  
 * 
 * @param {*} index 
 * 
 * @return object
 */
let piecesInfo = function (index) {

    const MAX_THUMB_PER_PAGE = 21;
    index = Number(index);

    if (isNaN(index) || index <= 0) {
        console.log(`Enter a valid page index, not [${index}]`);
        return null;
    }

    //read from DB
    //TODO: do it from DB
    let rawdata = fs.readFileSync('../tests/mockdata/pieces-mock.json');
    const pieces = JSON.parse(rawdata);
    rawdata = fs.readFileSync('../tests/mockdata/categories-mock.json');
    const categories = JSON.parse(rawdata);
    rawdata = fs.readFileSync('../tests/mockdata/picked-mock.json');
    const picked = JSON.parse(rawdata);

    //calculate next Thumbs per page
    const MIN = (index - 1) * MAX_THUMB_PER_PAGE;
    const MAX = (pieces.length < MAX_THUMB_PER_PAGE) ? pieces.length : ((pieces.length < MIN + MAX_THUMB_PER_PAGE) ? pieces.length : MIN + 21);

    //calculate buttons to show
    let buttons = [];
    let buttonsSize = Math.trunc(pieces.length / MAX_THUMB_PER_PAGE);

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

    //return all the info needed by the front-end
    return {
        title: 'Art Shoping',
        stringPieces: JSON.stringify(pieces),
        piecePhoto: pieces,
        categories: categories,
        cart: picked,
        page_min: MIN,
        page_max: MAX,
        buttons: buttons
    };
}

module.exports = piecesInfo;