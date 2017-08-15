'use strict'

let actions = app => {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
    }
    
    return paths
}

module.exports = actions