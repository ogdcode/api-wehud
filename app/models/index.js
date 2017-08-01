'use strict';

var mongoose = require('mongoose');
var q = require('q');

mongoose.Promise = q.Promise;

var initialize = function(app) {
    var modules = app.modules;
    
    var db = modules.dbconnect;
    
    app.mongoose = mongoose.connect(db);
    
    app.models = {
        user: require('./User')(app),
    };
};

module.exports = initialize;