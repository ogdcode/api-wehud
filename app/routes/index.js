var initialize = function(app) {
    app.use('/users', require('./users')(app));
    app.use('/auth', require('./auth')(app));
};

module.exports = initialize;