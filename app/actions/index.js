var actions = function(app) {
    app.actions = {
        users: require('./users')(app)
    };
};

module.exports = actions;