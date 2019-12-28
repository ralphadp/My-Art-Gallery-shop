var sqlConn = require('../database/db');

class Categories {

    constructor() {

    }

    fetchSearchQuery(pattern) {
        let wherePattern = '';

        if (pattern) {
            wherePattern = ` WHERE (name REGEXP "${pattern}") `;
        }

        return wherePattern;
    }
    
    /**
     * Select a single category
     * @param {*} id 
     */
    getById(id) {
        
        let sql = 'SELECT * FROM categories WHERE id = ?';

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [id], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Get all the categories order by id
     */
    getAll() {
        let sql = "SELECT * FROM categories order by id";

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

    getAllSearching(pattern) {
 
        let sql = `SELECT * FROM categories ${this.fetchSearchQuery(pattern)} order by id`;

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
     * Save a new category
     * @param {*} category 
     */
    save(category) {
        let data = {
            path: category.path, 
            name: category.name
        };

        let sql = "INSERT INTO categories SET ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, data, (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Update the category selected by id
     * @param {*} category 
     */
    update(category) {
        let data = {
            id: category.id,
            path: category.path, 
            name: category.name
        };

        let sql = "UPDATE categories SET path=?, name=? WHERE id = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [data.path, data.name, data.id], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Delete the selected category by id
     * @param {*} categoryId 
     */
    delete(categoryId) {

        let sql = "DELETE FROM categories WHERE id = ?";

        return new Promise((resolve, reject) => {
            sqlConn.query(sql, [categoryId], (err, result) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = Categories;