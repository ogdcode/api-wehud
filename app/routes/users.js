'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.actions.users.create)
    router.get('/user/:userId', app.actions.users.read)
    router.put('/user/:userId', bodyParser, app.actions.users.update)
    router.delete('/user/:userId', bodyParser, app.actions.users.delete)
    
    router.get('/all', app.actions.users.list)
    
    router.get('/posts/:userId', app.actions.users.posts)
    router.get('/games/:userId', app.actions.users.games)
    router.get('/plannings/:userId', app.actions.users.plannings)
    router.get('/pages/:userId', app.actions.users.pages)
    
    router.get('/followed/:userId', app.actions.users.followed)
    router.get('/followed/posts/:userId', app.actions.users.followedPosts)
    router.get('/followed/plannings/:userId', app.actions.users.followedPlannings)
    router.get('/followers/posts/:userId', app.actions.users.followersPosts)
    router.get('/followers/plannings/:userId', app.actions.users.followersPlannings)
    
    router.get('/', app.middlewares.isAuthenticated, app.actions.users.readByToken)
    router.put('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.updateByToken)
    router.delete('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.deleteByToken)
    router.get('/posts', app.middlewares.isAuthenticated, app.actions.users.postsByToken)
    router.get('/games', app.middlewares.isAuthenticated, app.actions.users.gamesByToken)
    router.get('/plannings', app.middlewares.isAuthenticated, app.actions.users.planningsByToken)
    router.get('/pages', app.middlewares.isAuthenticated, app.actions.users.pagesByToken)
    
    router.get('/followed', app.middlewares.isAuthenticated, app.actions.users.followedByToken)
    router.get('/followed/posts', app.middlewares.isAuthenticated, app.actions.users.followedPostsByToken)
    router.get('/followed/plannings', app.middlewares.isAuthenticated, app.actions.users.followedPlanningsByToken)
    router.get('/followers/posts', app.middlewares.isAuthenticated, app.actions.users.followersPostsByToken)
    router.get('/followers/plannings', app.middlewares.isAuthenticated, app.actions.users.followersPlanningsByToken)
    
    router.patch('/follow/:userId', bodyParser, app.middlewares.isAuthenticated, app.actions.users.follow)
    router.patch('/unfollow/:userId', app.middlewares.isAuthenticated, app.actions.users.unfollow)
    router.patch('/follow/game/:gameId', bodyParser, app.middlewares.isAuthenticated, app.actions.users.followGame)
    router.patch('/unfollow/game/:gameId', app.middlewares.isAuthenticated, app.actions.users.unfollowGame)
    
    return router
}

module.exports = routes