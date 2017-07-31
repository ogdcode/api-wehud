'use strict';

var read = function(app) {
    var errs = app.errors;
    var User = app.models.user;
    
    let task = function(req, res) {
        let currentUser = req.session.user;
        
        let query = User.findOne({ _id: currentUser._id });
        let promise = query.exec();
        
        promise.then(function(user) {
            res.status(200).json(user);
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = read;