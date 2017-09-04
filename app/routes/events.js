'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.middlewares.isAuthenticated, app.actions.events.create)
    router.get('/:eventId', app.actions.events.read)
    router.put('/:eventId', bodyParser, app.actions.events.update)
    router.delete('/:eventId', app.actions.events.delete)
    
    router.get('/', app.actions.events.list)
    router.patch('/bind/:eventId', bodyParser, app.actions.events.bind)
    router.patch('/unbind/:eventId', bodyParser, app.actions.events.unbind)
    
    return router
}

module.exports = routes