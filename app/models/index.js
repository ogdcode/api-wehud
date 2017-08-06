'use strict'

const MONGOOSE = require('mongoose')
const Q = require('q')

MONGOOSE.Promise = Q.Promise

let initialize = function(app) {
    let modules = app.modules
    
    let db = modules.dbconnect
    
    app.mongoose = MONGOOSE.connect(db)
    
    app.models = {
        user: require('./User')(app),
        post: require('./Post')(app),
        page: require('./Page')(app),
        game: require('./Game')(app)
    }
}

module.exports = initialize