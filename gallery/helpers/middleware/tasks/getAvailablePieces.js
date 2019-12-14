const {arrayToObject} = require("./util/utilities");
const piecesRepo = require('../../../repository/repo-pieces');

const getAvailablePieces = (context, next) => {

    const oPieces = new piecesRepo(global.currentUser, context.categoryCode);
    
    oPieces.getAvailables()
    .then(pieces => {

        const {piecePhoto} = context;
        context.piecePhoto = (piecePhoto || arrayToObject(pieces, 'itemId'));

        next(null, context.piecePhoto);
    })
    .catch(error => {
        throw error;
    });
};

module.exports = getAvailablePieces;