'use strict';

var initialize = function(app) {
    var config = app.config;
    
    var map = {
        '<user>': config.db.user,
        '<pass>': config.db.pass,
        '<name>': config.db.name
    };
    
    var path = config.db.path;
    
    return replaceMultiple(path, map);
};

function replaceMultiple(str, map) {
    var regex = new RegExp(Object.keys(map).join('|'), 'gi');
    
    return str.replace(regex, function(matched) {
        return map[matched];
    });
}

module.exports = initialize;