'use strict'

var middlewares = app => {
    app.middlewares = {
        isAuthenticated: require('./isAuthenticated')(app)
    }
}

module.exports = middlewares