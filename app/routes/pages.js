'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.middlewares.isAuthenticated, app.actions.pages.create)
    router.get('/:pageId', app.actions.pages.read)
    router.put('/:pageId', bodyParser, app.actions.pages.update)
    router.delete('/:pageId', app.actions.pages.delete)
    
    router.get('/', app.actions.pages.list)
    
    return router
}

module.exports = routes