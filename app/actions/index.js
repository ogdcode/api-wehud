var actions = function(app) {
    app.actions = {
        users: require('./users')(app),
        games: require('./games')(app),
        auth: require('./auth')(app)
    };
};

module.exports = actions;