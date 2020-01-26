var pjson = require('../package.json');

const rootResponser = (req, res, next) => {
    res.send(`Images Service v.${pjson.version}`);
}

module.exports = {
    rootResponser: rootResponser
};