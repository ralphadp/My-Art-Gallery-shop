const fs = require('fs');
const piecesRepo = require('../repository/repo-pieces');
const categoryRepo = require('../repository/repo-categories');
const cartRepo = require('../repository/repo-cart');

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
 * @param {*} pieceslLength 
 * @param {*} index 
 */
let calculatePagerButtons = (pieceslLength, index) => {

    let buttons = [];
    let buttonsSize = numPages(pieceslLength);

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
 * Getting all info for the 'pieces thumbs' and 'categories' pages
 * TODO: It has 4 concerns, need to be separated  
 * 
 * @param {*} index 
 * @param {*} category 
 * @param {*} resolve 
 */
let thumbsInfo = (index, category, resolve) => {

    index = Number(index);

    if (isNaN(index)) {
        console.log(`Invalid page index, not [${index}]`);
        resolve(null);
    }

    //read from DB
    const oPieces = new piecesRepo(global.currentUser, category);
    oPieces.getSize()
    .then(totalPieces => {

        let NUM_PAGES = numPages(totalPieces);
        
        if (NUM_PAGES > 0) {
            if (index < 1 || index > NUM_PAGES) {
                console.log(`Page index out of bounds [${index}]`);
                resolve(null);
            }
        }

        oPieces.getAll(MAX_THUMB_PER_PAGE, (index - 1) * MAX_THUMB_PER_PAGE)
        .then(pieces => {

            return arrayToObject(pieces, 'itemId');
        })
        .then(pieces => {

            let {MIN, MAX} = calculateThumbPerPage(pieces, index);
            let buttons = calculatePagerButtons(totalPieces, index);

            //return all the info needed by the front-end
            return {
                title: 'Art Shoping',
                stringPieces: JSON.stringify(pieces),
                piecePhoto: pieces,
                page_min: MIN,
                page_max: MAX,
                buttons: buttons,
                categoryCode: category 
            };   
        })
        .then(resultObject => {
            const oCategory = new categoryRepo();
            oCategory.getAll()
            .then(categories => {
                resultObject.categories = categories;

                //return all the info needed by the front-end
                return resultObject;
            })
            .then(resultObject => {
                const oCart = new cartRepo();
                oCart.getById(global.currentUser)
                .then(picked => {
                    resultObject.cart = picked;

                    //pass all the info needed by the front-end
                    resolve(resultObject);
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(error => {
        console.log(error);
    });

}

module.exports = thumbsInfo;