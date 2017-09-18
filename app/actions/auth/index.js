'use strict';

var actions = function(app) {
    let paths = {
        login: require('./login')(app),
        logout: require('./logout')(app),
        password: require('./password')(app)
    }
    
    return paths;
};

module.exports = actions;