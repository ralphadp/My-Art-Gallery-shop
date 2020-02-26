const {MAX_THUMB_PER_PAGE, arrayToObject} = require("./util/utilities");
const {pieces} = require('gallery-repository');

const getPiecesPageItems = (context, next) => {

    const oPieces = new pieces(context.currentUser.userExtId, context.categoryCode);
    
    oPieces.getAll (
        MAX_THUMB_PER_PAGE, 
        (context.index - 1) * MAX_THUMB_PER_PAGE
    )
    .then(piecesResult => {

        const {piecePhoto} = context;
        context.piecePhoto = (piecePhoto || arrayToObject(piecesResult, 'itemId'));

        const {stringPieces} = context;
        context.stringPieces = (stringPieces || JSON.stringify(context.piecePhoto));

        next(null, context.piecePhoto);
    })
    .catch(error => {
        throw error;
    });
};

module.exports = getPiecesPageItems;