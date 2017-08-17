'use strict'

let initialize = app => {
    app.config = require('./config.json')
    app.errors = require('./errors.json')
}

module.exports = initialize