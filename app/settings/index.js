'use strict';

var initialize = function(app) {
    app.config = require('./config.json');
    app.errors = require('./errors.json');
};

module.exports = initialize;