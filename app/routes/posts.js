'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.middlewares.isAuthenticated, app.actions.posts.create)
    router.get('/:postId', app.actions.posts.read)
    router.put('/:postId', bodyParser, app.middlewares.isAuthenticated, app.actions.posts.update)
    router.delete('/:postId', app.middlewares.isAuthenticated, app.actions.posts.delete)
    
    router.get('/', app.actions.posts.list)
    
    router.get('/messages/:userId', app.actions.posts.messages)
    router.get('/games/:gameId', app.actions.posts.games)
    
    router.get('/all/messages', app.middlewares.isAuthenticated, app.actions.posts.messagesByToken)
    
    router.patch('/like/:userId/:postId', app.middlewares.isAuthenticated, app.actions.posts.like)
    router.patch('/dislike/:userId/:postId', app.middlewares.isAuthenticated, app.actions.posts.dislike)
    router.patch('/like/:postId', app.middlewares.isAuthenticated, app.actions.posts.likeByToken)
    router.patch('/dislike/:postId', app.middlewares.isAuthenticated, app.actions.posts.dislikeByToken)
    
    return router
}

module.exports = routes