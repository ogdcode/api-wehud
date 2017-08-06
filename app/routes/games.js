'use strict'

let router = require('express').Router()

let routes = function(app) {
    router.post('/', app.actions.games.create)
    router.get('/:gameId', app.actions.games.read)
    router.get('/', app.actions.games.list)
    
    return router
}

module.exports = routes