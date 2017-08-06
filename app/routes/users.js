'use strict'

var router = require('express').Router()
var bodyParser = require('body-parser').json()

// TODO: Add isAuthenticated middleware when finished the API.

let usersRoutes = app => {
    router.post('/', bodyParser, app.actions.users.create)
    router.get('/user/:userId', app.actions.users.read)
    router.put('/user/:userId', bodyParser, app.actions.users.update)
    router.delete('/user/:userId', bodyParser, app.actions.users.delete)
    
    router.get('/', app.middlewares.isAuthenticated, app.actions.users.readByToken)
    router.put('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.updateByToken)
    router.delete('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.deleteByToken)
    
    router.get('/all', app.actions.users.list)
    router.patch('/follow/:userId', app.middlewares.isAuthenticated, app.actions.users.follow)
    router.patch('/unfollow/:userId', app.middlewares.isAuthenticated, app.actions.users.unfollow)
    
    return router
};

module.exports = usersRoutes