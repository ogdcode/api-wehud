'use strict';

var logout = function(app) {    
    var task = function(req, res) {
        delete req.session;
    };
    
    return task;
};

module.exports = logout;