let initialize = app => {
    app.use('/users', require('./users')(app))
    app.use('/posts', require('./posts')(app))
    app.use('/pages', require('./pages')(app))
    app.use('/games', require('./games')(app))
    app.use('/auth', require('./auth')(app))
}

module.exports = initialize