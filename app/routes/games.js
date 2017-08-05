'use strict'

var router = require('express').Router()

let gamesRoutes = function(app) {
    router.post('/', app.actions.games.create)
    router.get('/:gameId', app.middlewares.isAuthenticated, app.actions.games.read)
    router.get('/', app.actions.games.list)
    
    return router
}

module.exports = gamesRoutes