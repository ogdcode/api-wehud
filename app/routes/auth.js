'use strict';

var router = require('express').Router();
var bodyParser = require('body-parser').json();

var authRoutes = function(app) {
    router.post('/login', bodyParser, app.actions.auth.login);
    
    return router;
};

module.exports = authRoutes;