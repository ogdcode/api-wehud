'use strict'

let initialize = app => {
    app.modules = {
        dbconnect: require('./dbconnect')(app),
        encryption: require('./encryption'),
        jwt: require('./jwt'),
        utils: require('./utils')
    }
}

module.exports = initialize