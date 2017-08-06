'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let authRoutes = app => {
    router.post('/login', bodyParser, app.actions.auth.login)
    router.get('/logout', app.middlewares.isAuthenticated, app.actions.auth.logout)
    
    return router
};

module.exports = authRoutes