'use strict'

let actions = app => {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
        list: require('./list')(app),
        like: require('./like')(app),
        dislike: require('./dislike')(app),
        likeByToken: require('./likeByToken')(app),
        dislikeByToken: require('./dislikeByToken')(app)
    }
    
    return paths
}

module.exports = actions