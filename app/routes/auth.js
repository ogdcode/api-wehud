'use strict'

let router = require('express').Router()
let bodyParser = require('body-parser').json()

let routes = app => {
    router.post('/login', bodyParser, app.actions.auth.login)
    router.get('/logout', app.middlewares.isAuthenticated, app.actions.auth.logout)
    router.post('/password', bodyParser, app.actions.auth.password)
    
    return router
}

module.exports = routes