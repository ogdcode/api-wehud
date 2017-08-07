let actions = app => {
    app.actions = {
        users: require('./users')(app),
        posts: require('./posts')(app),
        pages: require('./pages')(app),
        games: require('./games')(app),
        events: require('./events')(app),
        plannings: require('./plannings')(app),
        auth: require('./auth')(app)
    }
}

module.exports = actions