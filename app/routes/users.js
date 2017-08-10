'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/', bodyParser, app.actions.users.create)
    router.get('/user/:userId', app.actions.users.read)
    router.put('/user/:userId', bodyParser, app.actions.users.update)
    router.delete('/user/:userId', bodyParser, app.actions.users.delete)
    
    router.get('/followed/:userId', app.actions.users.getFollowed)
    router.get('/followed/games/:userId', app.actions.users.getFollowedGames)
    router.get('/followed/posts/:userId', app.actions.users.getFollowedPosts)
    router.get('/followed/plannings/:userId', app.actions.users.getFollowedPlannings)
    router.get('/followers/posts/:userId', app.actions.users.getFollowersPosts)
    router.get('/followers/plannings/:userId', app.actions.users.getFollowersPlannings)
    
    router.get('/', app.middlewares.isAuthenticated, app.actions.users.readByToken)
    router.put('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.updateByToken)
    router.delete('/', bodyParser, app.middlewares.isAuthenticated, app.actions.users.deleteByToken)
    router.get('/posts', app.middlewares.isAuthenticated, app.actions.users.postsByToken)
    router.get('/plannings', app.middlewares.isAuthenticated, app.actions.users.planningsByToken)
    router.get('/pages', app.middlewares.isAuthenticated, app.actions.users.pagesByToken)
    
    router.get('/followed', app.middlewares.isAuthenticated, app.actions.users.getFollowedByToken)
    router.get('/followed/games', app.middlewares.isAuthenticated, app.actions.users.getFollowedGamesByToken)
    router.get('/followed/posts', app.middlewares.isAuthenticated, app.actions.users.getFollowedPostsByToken)
    router.get('/followed/plannings', app.middlewares.isAuthenticated, app.actions.users.getFollowedPlanningsByToken)
    router.get('/followers/posts', app.middlewares.isAuthenticated, app.actions.users.getFollowersPostsByToken)
    router.get('/followers/plannings', app.middlewares.isAuthenticated, app.actions.users.getFollowersPlanningsByToken)
    
    router.get('/all', app.actions.users.list)
    router.get('/posts/:userId', app.actions.users.posts)
    router.get('/plannings/:userId', app.actions.users.plannings)
    router.get('/pages/:userId', app.actions.users.pages)
    
    router.patch('/follow/:userId', app.middlewares.isAuthenticated, app.actions.users.follow)
    router.patch('/unfollow/:userId', app.middlewares.isAuthenticated, app.actions.users.unfollow)
    router.patch('/follow/game/:gameId', app.middlewares.isAuthenticated, app.actions.users.followGame)
    router.patch('/unfollow/game/:gameId', app.middlewares.isAuthenticated, app.actions.users.unfollowGame)
    
    return router
}

module.exports = routes