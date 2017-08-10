'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.actions.users.create)
    router.get('/user/:userId', app.actions.users.read)
    router.put('/user/:userId', bodyParser, app.actions.users.update)
    router.delete('/user/:userId', bodyParser, app.actions.users.delete)
    
    router.get('/followed/:userId', app.actions.users.getFollowed)
    router.get('/posts/:userId', app.actions.users.getFollowedPosts)
    router.get('/plannings/:userId', app.actions.users.getFollowedPlannings)
    router.get('/follow/posts/:userId', app.actions.users.getFollowersPosts)
    router.get('/follow/plannings/:userId', app.actions.users.getFollowersPlannings)
    
    router.get('/', app.middlewares.isAuthenticated, app.actions.users.readByToken)
    router.put('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.updateByToken)
    router.delete('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.deleteByToken)
    router.get('/follow', app.middlewares.isAuthenticated, app.actions.users.getFollowedByToken)
    router.get('/posts', app.middlewares.isAuthenticated, app.actions.users.getFollowedPostsByToken)
    router.get('/plannings', app.middlewares.isAuthenticated, app.actions.users.getFollowedPlanningsByToken)
    router.get('/follow/posts', app.middlewares.isAuthenticated, app.actions.users.getFollowersPostsByToken)
    router.get('/follow/plannings', app.actions.users.getFollowersPlanningsByToken)
    
    router.get('/all', app.actions.users.list)
    router.patch('/follow/:userId', app.middlewares.isAuthenticated, app.actions.users.follow)
    router.patch('/unfollow/:userId', app.middlewares.isAuthenticated, app.actions.users.unfollow)
    router.patch('/follow/game/:gameId', app.middlewares.isAuthenticated, app.actions.users.followGame)
    router.patch('/unfollow/game/:gameId', app.middlewares.isAuthenticated, app.actions.users.unfollowGame)
    
    return router
}

module.exports = routes