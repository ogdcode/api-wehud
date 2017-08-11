'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.middlewares.isAuthenticated, app.actions.posts.create)
    router.get('/:postId', app.actions.posts.read)
    router.put('/:postId', bodyParser, app.actions.posts.update)
    router.delete('/:postId', app.actions.posts.delete)
    
    router.get('/', app.actions.posts.list)
    router.patch('/like/:userId/:postId', app.actions.posts.like)
    router.patch('/dislike/:userId/:postId', app.actions.posts.dislike)
    router.patch('/like/:postId', app.middlewares.isAuthenticated, app.actions.posts.likeByToken)
    router.patch('/dislike/:postId', app.middlewares.isAuthenticated, app.actions.posts.dislikeByToken)
    
    return router
}

module.exports = routes