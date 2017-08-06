let actions = app => {
    app.actions = {
        users: require('./users')(app),
        posts: require('./posts')(app),
        pages: require('./pages')(app),
        games: require('./games')(app),
        auth: require('./auth')(app)
    }
}

module.exports = actions