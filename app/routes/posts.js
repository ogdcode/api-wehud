'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.middlewares.isAuthenticated, app.actions.posts.create)
    router.get('/:postId', app.actions.posts.read)
    router.put('/:postId', bodyParser, app.actions.posts.update)
    router.delete('/:postId', app.actions.posts.delete)
    
    router.get('/', app.actions.posts.list)
    
    return router
}

module.exports = routes