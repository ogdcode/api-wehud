'use strict';

var create = function(app) {
    var config = app.config;
    var errs = app.errors;
    var User = app.models.user;
        
    let task = function(req, res) {
        let body = req.body;

        body.password = app.modules.encryption.encrypt(app, body.password);
        
        let user = new User(body);
        let promise = user.save();
        promise.then(function(instance) {
            res.status(201).json({ id: instance._id });
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = create;