var sqlConn = require('../database/db');

class Categories {

    constructor() {

    }
    
    getById(id) {
        let result = {};
        let sql = `SELECT * FROM categories WHERE id = '${id}'`;
        let query = sqlConn.query(sql, (error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }

    getAll() {
        let sql = "SELECT * FROM categories";
        return new Promise((resolve, reject) => {
            sqlConn.query(sql, (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    save(category) {
        let result = {};
        let data = {path: category.path,  name: category.name};
        let sql = "INSERT INTO categories SET ?";
        let query = sqlConn.query(sql, data,(error, results) => {
            if (error) {
                throw error;
            }
            result = JSON.parse(JSON.stringify(results));
        });

        return result;
    }
}

module.exports = Categories;