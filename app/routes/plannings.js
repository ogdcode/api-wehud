'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.middlewares.isAuthenticated, app.actions.plannings.create)
    router.get('/:planningId', app.actions.plannings.read)
    router.put('/:planningId', bodyParser, app.actions.plannings.update)
    router.delete('/:planningId', app.actions.plannings.delete)
    
    router.get('/', app.actions.plannings.list)
    router.patch('/unbind/:planningId', bodyParser, app.actions.plannings.unbind)
    
    return router
}

module.exports = routes