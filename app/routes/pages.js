'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.middlewares.isAuthenticated, app.actions.pages.create)
    router.get('/:pageId', app.actions.pages.read)
    router.put('/:pageId', app.actions.pages.update)
    router.delete('/:pageId', app.actions.pages.delete)
    
    return router
}

module.exports = routes