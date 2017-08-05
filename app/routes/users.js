'use strict';

var router = require('express').Router();
var bodyParser = require('body-parser').json();

var usersRoutes = function(app) {
    router.post('/', bodyParser, app.actions.users.create);
    router.get('/:', app.middlewares.isAuthenticated, app.actions.users.read);
    router.put('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.update);
    router.delete('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.delete);
    
    router.get('/all', app.actions.users.list);
    
    return router;
};

module.exports = usersRoutes;