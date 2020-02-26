const {MAX_THUMB_PER_PAGE, arrayToObject} = require("./util/utilities");
const {pieces} = require('gallery-repository');

const getSearchingPageItems = (context, next) => {

    const oPieces = new pieces(context.currentUser.userExtId, context.categoryCode);
    oPieces.getAllSearching(
        context.words,
        MAX_THUMB_PER_PAGE, 
        (context.index - 1) * MAX_THUMB_PER_PAGE
    )
    .then(piecesResult => {

        context.piecePhoto = arrayToObject(piecesResult, 'itemId');
        context.stringPieces = JSON.stringify(piecesResult);

        next(null, context.piecePhoto);
    })
    .catch(error => {
        throw error;
    });;
};

module.exports = getSearchingPageItems;