'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.models.events.create)
    router.get('/:eventId', app.models.events.read)
    router.put('/:eventId', bodyParser, app.models.events.update)
    router.delete('/:eventId', app.models.events.delete)
    
    router.get('/', app.models.events.list)
    router.patch('/bind/:eventId', bodyParser, app.actions.events.bind)
    router.patch('/unbind/:eventId', bodyParser, app.actions.events.unbind)
    
    return router
}

module.exports = routes