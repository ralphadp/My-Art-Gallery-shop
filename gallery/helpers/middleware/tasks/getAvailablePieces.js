const {arrayToObject} = require("./util/utilities");
const {pieces} = require('galleryRepository');

const getAvailablePieces = (context, next) => {

    const oPieces = new pieces(global.currentUser, context.categoryCode);
    
    oPieces.getAvailables()
    .then(piecesResult => {

        const {piecePhoto} = context;
        context.piecePhoto = (piecePhoto || arrayToObject(piecesResult, 'itemId'));

        next(null, context.piecePhoto);
    })
    .catch(error => {
        throw error;
    });
};

module.exports = getAvailablePieces;