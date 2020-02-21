var {pieces} = require('gallery-repository');
var Util = require('../model/util');
var ConfigHandler = require('../model/configHandler');

module.exports = {
    getPieces: (req, res, next) => {

        const response = req.cookies.piece_response || null;
        res.clearCookie('piece_response');

        const piece = new pieces();
        piece.getAllOf().then((result) => {
            res.renderPage(
                'pieces', 
                { 
                    title: 'List of Pieces', 
                    tableTitle: 'Pieces', 
                    data: result,
                    response: response
                }
            );
        });
    },
    addPiece: (req, res, next) => {

        const response = req.cookies.piece_response || null;
        res.clearCookie('piece_response');

        Util.getAllArtCategories().then(categories =>
            res.renderPage(
              'pieces-form', 
              { 
                title: 'Pieces', 
                titleForm: 'New Piece',
                categories: categories,
                response: response,
                dataToUpdate: null
              }
            )
        );
    },
    savePiece: (req, res, next) => {

        const piece = new pieces();

        const pieceParam = {
            itemId: req.body.itemId,
            name: req.body.name,
            artist: req.body.artist,
            type: req.body.type,
            release_date: req.body.release_date,
            size: req.body.size,
            price: req.body.price,
            currency: req.body.currency
        };
 
        let response = {};

        piece.save(pieceParam).then(result => {
            response = {
                success: true,
                message: 'The piece was added sucessfully.'
            };
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response = {
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('piece_response' , response, {maxAge: 20000});
            res.redirect( req.header('Referer') || '/');
        });
    },
    editPiece: function(req, res, next) {

        const response = req.cookies.piece_response || null;
        res.clearCookie('piece_response');

        const piece = new pieces();

        piece.getById(req.params.id)
        .then((pieceResult) => {
            let dataToUpdate = !response ? (pieceResult[0] || null) : response.data;

            dataToUpdate.release_date = Util.getDateFromDatetime(dataToUpdate.release_date);

            Util.getAllArtCategories().then(categories =>
                res.renderPage(
                    'pieces-form', {
                        title: 'Pieces', 
                        titleForm: 'Edit Piece',
                        categories: categories,
                        response: response,
                        dataToUpdate: dataToUpdate
                    }
                )
            );
        })
        .catch((error) => {
            console.log(error);
        });
    },
    updatePiece: function(req, res, next) {

        const piece = new pieces();

        const pieceParam = {
            itemId: req.body.itemId,
            name: req.body.name,
            artist: req.body.artist,
            type: req.body.type,
            release_date: req.body.release_date,
            size: req.body.size,
            price: req.body.price,
            currency: req.body.currency,
            id: req.body.id,
        };

        let response = {};

        piece.update(pieceParam)
        .then(result => {

            if (result.affectedRows) {
                response = {
                    data: pieceParam,
                    success: true,
                    message: 'The piece was updated sucessfully.'
                };
            } else {
                response = {
                    data: pieceParam,
                    success: false,
                    message: result.message
                };
            }
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response = {
                data: pieceParam,
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('piece_response' , response, {maxAge: 20000});
            if (ConfigHandler.fetchValue('REDIRECT_UPDATE')) {
                res.redirect('/pieces/');
            } else {
                res.redirect( req.header('Referer') || '/');
            }
        });
    },
    deletePiece: (req, res, next) => {

        const piece = new pieces();

        piece.delete(req.body.id)
        .then(result => {
            response = {
                success: true,
                message: 'The piece was removed sucessfully.'
            };
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response = {
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('piece_response' , response, {maxAge: 20000});
            res.redirect('/pieces/');
        });
    },
    searchPiece: (req, res, next) => {

        const response = req.cookies.piece_response || null;
        res.clearCookie('piece_response');

        const words = req.params.textPattern.split('+');
        const pattern = words.join('|');
        const phrase = words.join(' ');

        const piece = new pieces();

        piece.getAllSearchingForAdmin(pattern)
        .then((result) => {
            res.renderPage(
                'pieces', { 
                    title: `Pieces search by: "${phrase}" `,
                    tableTitle: 'Pieces', 
                    data: result, 
                    response: response,
                    searchText: phrase
                }
            );
        });
    }
};