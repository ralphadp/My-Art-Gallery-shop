const {MAX_THUMB_PER_PAGE, arrayToObject} = require("./util/utilities");
const piecesRepo = require('../../repository/repo-pieces');

const getSearchingPageItems = (context, next) => {

    const oPieces = new piecesRepo(global.currentUser, context.categoryCode);
    oPieces.getAllSearching(
        context.words,
        MAX_THUMB_PER_PAGE, 
        (context.index - 1) * MAX_THUMB_PER_PAGE
    )
    .then(pieces => {

        context.piecePhoto = arrayToObject(pieces, 'itemId');
        context.stringPieces = JSON.stringify(pieces);

        next(null, context.piecePhoto);
    })
    .catch(error => {
        throw error;
    });;
};

module.exports = getSearchingPageItems;