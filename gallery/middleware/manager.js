const verifyIndexPage = require("./tasks/verifyIndexPage");
const verifyWordPattern = require("./tasks/verifyWordPattern");
const getSearchingSize = require("./tasks/getSearchingSize");
const getSearchingPageItems = require("./tasks/getSearchingPageItems");
const getPiecesSize = require("./tasks/getPiecesSize");
const getPiecesPageItems = require("./tasks/getPiecesPageItems");
const calculateButtons = require("./tasks/calculateButtons");
const getCategories = require("./tasks/getCategories");
const getCart = require("./tasks/getCart");

const async = require('async');

/**
 * Middleware function to feed the pages
 *  
 * @param {*} index 
 * @param {*} category 
 * @param {*} wordPattern 
 * @param {*} next callback function
 */
let middlewareManager = (index, category, wordPattern, resolve) => {

    try {

        let pageFeed = {
            title: 'Art Shoping',
            index: index || 1,
            categoryCode: category || 'all',
            words: wordPattern || ''
        };
       
        const historic = (err, historic) => {
            //console.log('Historic: ', historic);
            resolve(err, pageFeed);
        };

        const single = [
            verifyIndexPage.bind(null, pageFeed),
            getPiecesSize.bind(null, pageFeed),
            getPiecesPageItems.bind(null, pageFeed),
            calculateButtons.bind(null, pageFeed),
            getCategories.bind(null, pageFeed),
            getCart.bind(null, pageFeed)
        ];

        const searching = [
            verifyWordPattern.bind(null, pageFeed),
            getSearchingSize.bind(null, pageFeed),
            getSearchingPageItems.bind(null, pageFeed),
            calculateButtons.bind(null, pageFeed),
            getCategories.bind(null, pageFeed),
            getCart.bind(null, pageFeed)
        ];

        let target = single;
        if (pageFeed.words.length) {
            target = searching;
        }

        async.series(
            target,
            historic
        );

    } catch(error) {
        console.log('the error', error);
        resolve(error, null);
    }

};

module.exports = middlewareManager;