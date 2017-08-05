'use strict'

let actions = function(app) {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        list: require('./list')(app)
    }
    
    return paths
}

module.exports = actions