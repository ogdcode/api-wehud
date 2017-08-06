'use strict'

let actions = app => {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
        readByToken: require('./readByToken')(app),
        updateByToken: require('./updateByToken')(app),
        deleteByToken: require('./deleteByToken')(app),
        list: require('./list')(app),
        follow: require('./follow')(app),
        unfollow: require('./unfollow')(app)
    };
    
    return paths
};

module.exports = actions