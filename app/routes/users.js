'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.actions.users.create)
    router.get('/user/:userId', app.actions.users.read)
    router.put('/user/:userId', bodyParser, app.actions.users.update)
    router.delete('/user/:userId', bodyParser, app.actions.users.delete)
    
    router.get('/', app.middlewares.isAuthenticated, app.actions.users.readByToken)
    router.put('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.updateByToken)
    router.delete('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.deleteByToken)
    router.get('/follow', app.middlewares.isAuthenticated, app.actions.users.getFollowedByToken)
    
    router.get('/all', app.actions.users.list)
    router.patch('/follow/:userId', app.middlewares.isAuthenticated, app.actions.users.follow)
    router.patch('/unfollow/:userId', app.middlewares.isAuthenticated, app.actions.users.unfollow)
    router.get('/followed/:userId', app.actions.users.getFollowed)
    
    return router
}

module.exports = routes