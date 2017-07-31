var actions = function(app) {
    app.actions = {
        users: require('./users')(app),
        auth: require('./auth')(app)
    };
};

module.exports = actions;