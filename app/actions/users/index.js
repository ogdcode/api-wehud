'use strict';

var actions = function(app) {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
        list: require('./list')(app)
    };
    
    return paths;
};

module.exports = actions;