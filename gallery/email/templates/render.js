var handlebars = require('handlebars');
var fs = require('fs');

const renderTemplate = (filepath, replacements) => {
    let html = fs.readFileSync(filepath, {encoding: 'utf-8'});
    let template = handlebars.compile(html);
    return template(replacements);
};

module.exports = renderTemplate;