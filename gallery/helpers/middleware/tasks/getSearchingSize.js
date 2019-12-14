const piecesRepo = require('../../../repository/repo-pieces');

const {numPages} = require("./util/utilities");

const getSearchingSize = (context, next) => {

    const oPieces = new piecesRepo(global.currentUser, context.categoryCode);
    oPieces.getSizeOfSearching(context.words)
    .then(totalPieces => {

        context.NUM_PAGES = numPages(totalPieces);
    
        if (context.NUM_PAGES > 0) {
            if (context.index < 1 || context.index > context.NUM_PAGES) {
                message = `Page index out of bounds [${context.index}]`;
                console.log(message);
                throw message;
            }
        }

        next(null, context.NUM_PAGES);
    })
    .catch(error => {
        throw error;
    });
 
};

module.exports = getSearchingSize;