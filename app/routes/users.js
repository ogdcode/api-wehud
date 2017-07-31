'use strict';

var router = require('express').Router();
var bodyParser = require('body-parser').json();

var usersRoutes = function(app) {
    router.post('/', bodyParser, app.actions.users.create);
    router.get('/', app.actions.users.list);
    
    return router;
};

module.exports = usersRoutes;