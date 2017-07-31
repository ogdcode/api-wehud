'use strict';

let del = function(app) {
    var errs = app.errors;
    var User = app.models.user;
    
    let task = function(req, res) {
        let currentUser = req.session.user;
        
        let query = User.findByIdAndRemove(currentUser._id);
        let promise = query.exec();
        
        promise.then(function() {
            res.status(204).json({});
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = del;