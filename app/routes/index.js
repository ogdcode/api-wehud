var initialize = function(app) {
    app.use('/users', require('./users')(app));
    
    /*
    app.use('/test', function(req, res) {
        res.json({ msg: 'Salut' });
    });
    */
};

module.exports = initialize;