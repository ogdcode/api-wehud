var list = function(app) {
    var errs = app.errors;
    var User = app.models.user;
    
    let task = function(req, res) {
        let query = User.find();
        let promise = query.exec();

        promise.then(function(users) {
            res.status(200).json(users);
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = list;