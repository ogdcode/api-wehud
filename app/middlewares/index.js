'use strict';

var middlewares = function(app) {
    app.middlewares = {
        isAuthenticated: require('./isAuthenticated')(app)
    };
};

module.exports = middlewares;