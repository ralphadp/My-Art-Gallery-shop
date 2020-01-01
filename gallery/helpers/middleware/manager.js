const verifyIndexPage = require("./tasks/verifyIndexPage");
const verifyWordPattern = require("./tasks/verifyWordPattern");
const getSearchingSize = require("./tasks/getSearchingSize");
const getSearchingPageItems = require("./tasks/getSearchingPageItems");
const getAvailablePieces = require("./tasks/getAvailablePieces");
const getPiecesSize = require("./tasks/getPiecesSize");
const getPiecesPageItems = require("./tasks/getPiecesPageItems");
const calculateButtons = require("./tasks/calculateButtons");
const getCategories = require("./tasks/getCategories");
const getCart = require("./tasks/getCart");

const async = require('async');

const keys = {
    INDEX: 'index',
    LEARNING: 'learning',
    WRITEUS: 'write-us',
    SEARCHING: 'searching'
};

/**
 * Middleware function to feed info in the pages
 *  
 * @param {*} params: {
 *                        key
 *                        index
 *                        currentUser
 *                        category 
 *                        wordPattern 
 *                        resolve callback function
 *                    } 
 */
let middlewareManager = (params) => {

    try {

        let pageFeed = {
            title: 'Art Shoping',
            index: params.index || 1,
            currentUser: params.currentUser || {userExtId:null},
            categoryCode: params.category || 'all',
            words: params.wordPattern || ''
        };

        let resolve = params.resolve || ((error, payload) => { console.log('resolve() function not defined')});

        const tasks = {
            [keys.INDEX]: [
                verifyIndexPage.bind(null, pageFeed),
                getPiecesSize.bind(null, pageFeed),
                getPiecesPageItems.bind(null, pageFeed),
                calculateButtons.bind(null, pageFeed),
                getCategories.bind(null, pageFeed),
                getCart.bind(null, pageFeed)
            ],
            [keys.LEARNING]: [
                getAvailablePieces.bind(null, pageFeed),
                getCategories.bind(null, pageFeed),
                getCart.bind(null, pageFeed)
            ],
            [keys.WRITEUS]: [
                getAvailablePieces.bind(null, pageFeed),
                getCategories.bind(null, pageFeed),
                getCart.bind(null, pageFeed)
            ],
            [keys.SEARCHING]: [
                verifyWordPattern.bind(null, pageFeed),
                getSearchingSize.bind(null, pageFeed),
                getSearchingPageItems.bind(null, pageFeed),
                calculateButtons.bind(null, pageFeed),
                getCategories.bind(null, pageFeed),
                getCart.bind(null, pageFeed)
            ]
        };

        async.series(
            tasks[params.key],
            (error, historic) => {
                //console.log('Historic: ', historic);
                resolve(error, pageFeed);
            }
        );

    } catch (error) {
        console.log('error: ', error);
        resolve(error, null);
    }

};

module.exports = {
    keys,
    middlewareManager
};