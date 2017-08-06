'use strict'

let initialize = app => {
    app.modules = {
        dbconnect: require('./dbconnect')(app),
        encryption: require('./encryption'),
        jwt: require('./jwt')
    }
}

module.exports = initialize