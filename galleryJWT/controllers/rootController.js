var pjson = require('../package.json');

module.exports = {
    rootResponser: (req, res, next) => {
        res.send(`JWT Api v.${pjson.version}`);
    }
};