var sqlConn = require('../database/db');

class Pieces {

    constructor() {

    }
    
    getById(id) {
        let result = {};
        let sql = `SELECT * FROM pieces WHERE id = '${id}'`;
        let query = sqlConn.query(sql, (error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }

    getSize() {
        let sql = "SELECT count(*) AS size FROM pieces";
        
        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (err, result) => {
                if (!err) {
                    resolve(result[0].size);
                } else {
                    reject(err);
                }
            });
        });
    }

    getAll(maxItems, page) {
        let sql = "SELECT * FROM pieces LIMIT ? OFFSET ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [maxItems, page], (err, result) => {
                if (!err) {
                    const cleanJson = JSON.parse(JSON.stringify(result));
                    resolve(cleanJson);
                } else {
                    reject(err);
                }
            });
        });
    }

    update(piece) {
        let sql = `UPDATE piece SET name='${piece.name}', artist='${piece.artist}' WHERE price=${piece.price}`;
        let query = sqlConn.query(sql, (error, results) => {
            if (error) {
                throw error;
            }

            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }

    delete(id) {
        let result = {};
        let sql = `DELETE FROM piece WHERE id='${id}'`;
        let query = sqlConn.query(sql, (error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }

    save(piece) {
        let result = {};
        let data = {name: piece.name, artist: piece.artist};
        let sql = "INSERT INTO pieces SET ?";
        let query = sqlConn.query(sql, data,(error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }
}

module.exports = Pieces;