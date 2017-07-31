'use strict';

var initialize = function(app) {
    app.modules = {
        dbconnect: require('./dbconnect')(app)
    };
};

module.exports = initialize;