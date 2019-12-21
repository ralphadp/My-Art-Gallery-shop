var sqlConn = require('../database/db');

class Pieces {

    /**
     * Pieces for some User
     * @param {*} userId 
     */
    constructor(userId, category) {
        this.userId = userId || '';
        this.category = category || 'all';

        //no query in case 'ALL'
        this.queryCategory = '';
        //set query for category
        if (this.category.toLowerCase() !== 'all') {
            this.queryCategory = ` WHERE type = '${this.category}'`;
        }
    }

    /**
     * Fetch the SQL search query 
     * @param {*} pattern 
     */
    fetchSearchQuery(pattern) {
        let wherePattern = '';

        if (pattern) {
            wherePattern = ` WHERE (name REGEXP "${pattern}") or (artist REGEXP "${pattern}") or (type REGEXP "${pattern}")`;
        }

        return wherePattern;
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
        let sql = `SELECT count(*) AS size FROM pieces${this.queryCategory}`;
        
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
     * Get the Total pieces of searching
     *
     * @param {*} pattern 
     */
    getSizeOfSearching(pattern) {

        let sql =  `SELECT count(*) AS size FROM pieces ${this.fetchSearchQuery(pattern)}`;

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
        let sql = `SELECT pieces.*, (CASE WHEN cart.userId = '${this.userId}' THEN cart.id WHEN cart.userId <> '${this.userId}' THEN 'PRIVATE' ELSE NULL END) AS picked FROM pieces LEFT JOIN cart ON pieces.itemId = cart.pieceId ${this.queryCategory} order by release_date desc LIMIT ? OFFSET ?`;

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
     * Get all the pieces with users owners 
     */
    getAllOf() {
        let sql = `SELECT pieces.*, cart.userId FROM pieces LEFT JOIN cart ON pieces.itemId = cart.pieceId order by release_date desc`;

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (error, result) => {
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
     * Get all the available pieces
     */
    getAvailables() {
        let sql = `SELECT pieces.* FROM pieces where pieces.itemId NOT IN (SELECT pieceId FROM cart) ORDER BY release_date;`;

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (error, result) => {
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
     * Get all the pieces already taken by other users including the current user
     */
    getNotAvailables() {
        let sql = 'SELECT pieces.* FROM pieces RIGHT JOIN cart ON pieces.itemId = cart.pieceId ORDER BY release_date';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (error, result) => {
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
     * Get all the pieces for a Page, also with the info if they are available or not(picked).
     * 
     * @param {*} pattern
     * @param {*} maxItems 
     * @param {*} pageOffset 
     */
    getAllSearching(pattern, maxItems, pageOffset) {
 
        let sql = `SELECT pieces.*, (CASE WHEN cart.userId = '${this.userId}' THEN cart.id WHEN cart.userId <> '${this.userId}' THEN 'PRIVATE' ELSE NULL END) AS picked FROM pieces LEFT JOIN cart ON pieces.itemId = cart.pieceId ${this.fetchSearchQuery(pattern)} order by release_date desc LIMIT ? OFFSET ?`;

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
        let data = {
            itemId: 'UUID()', 
            thumb: piece.url, 
            name: piece.name, 
            artist: piece.artist, 
            type: piece.type,
            release_date: piece.release,
            size: piece.size,
            price: piece.price,
            currency: piece.currency
        };
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
        let data = {
            itemId: 'UUID()', 
            thumb: piece.url,
            name: piece.name, 
            artist: piece.artist, 
            type: piece.type,
            release_date: piece.release,
            size: piece.size,
            price: piece.price,
            currency: piece.currency
        };
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