var sqlConn = require('../database/db');

class Pieces {

    /**
     * Pieces for some User
     * @param {*} userId 
     */
    constructor(userId) {
        this.userId = userId;
    }
    
    /**
     * Get th einfo for cetain piece
     * @param {*} pieceId 
     */
    getById(pieceId) {
        let sql = 'SELECT * FROM pieces WHERE id = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [pieceId], (error, result) => {
                if (!error) {
                    const cleanJson = JSON.parse(JSON.stringify(result));
                    resolve(cleanJson);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Get the Total pieces in the gallery
     */
    getSize() {
        let sql = "SELECT count(*) AS size FROM pieces";
        
        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (error, result) => {
                if (!error) {
                    resolve(result[0].size);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Get all the pieces for a Page, also with the info if they are available or not(picked).
     * 
     * @param {*} maxItems 
     * @param {*} pageOffset 
     */
    getAll(maxItems, pageOffset) {
        let sql = `SELECT pieces.*, (CASE WHEN cart.userId = '${this.userId}' THEN cart.id WHEN cart.userId <> '${this.userId}' THEN 'PRIVATE' ELSE NULL END) AS picked FROM pieces LEFT JOIN cart ON pieces.id = cart.pieceId order by date desc LIMIT ? OFFSET ?`;

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [maxItems, pageOffset], (error, result) => {
                if (!error) {
                    const cleanJson = JSON.parse(JSON.stringify(result));
                    resolve(cleanJson);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Update the infofor a piece of the gallery
     * @param {*} piece 
     */
    update(piece) {
        let data = {name: piece.name, artist: piece.artist, price: piece.price};
        let sql = 'UPDATE piece SET ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, data, (error, result) => {
                if (!error) {
                    const cleanJson = JSON.parse(JSON.stringify(result));
                    resolve(cleanJson);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Remove a piece from the gallery
     * @param {*} pieceId 
     */
    delete(pieceId) {
        let sql = 'DELETE FROM piece WHERE id = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [pieceId], (error, result) => {
                if (!error) {
                    const cleanJson = JSON.parse(JSON.stringify(result));
                    resolve(cleanJson);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Save a new brand piece in our gallery
     * @param {*} piece 
     */
    save(piece) {
        let data = {name: piece.name, artist: piece.artist, price: piece.price};
        let sql = "INSERT INTO pieces SET ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, data, (error, result) => {
                if (!error) {
                    const cleanJson = JSON.parse(JSON.stringify(result));
                    resolve(cleanJson);
                } else {
                    reject(error);
                }
            });
        });
    }
}

module.exports = Pieces;