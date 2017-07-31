var actions = function(app) {
    let paths = {
        create: require('./create')(app),
        list: require('./list')(app)
    };
    
    return paths;
};

module.exports = actions;