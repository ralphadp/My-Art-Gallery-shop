const {MAX_THUMB_PER_PAGE, arrayToObject} = require("./util/utilities");
const piecesRepo = require('../../../repository/repo-pieces');

const getPiecesPageItems = (context, next) => {

    const oPieces = new piecesRepo(global.currentUser, context.categoryCode);
    
    oPieces.getAll (
        MAX_THUMB_PER_PAGE, 
        (context.index - 1) * MAX_THUMB_PER_PAGE
    )
    .then(pieces => {

        const {piecePhoto} = context;
        context.piecePhoto = (piecePhoto || arrayToObject(pieces, 'itemId'));

        const {stringPieces} = context;
        context.stringPieces = (stringPieces || JSON.stringify(context.piecePhoto));

        next(null, context.piecePhoto);
    })
    .catch(error => {
        throw error;
    });
};

module.exports = getPiecesPageItems;