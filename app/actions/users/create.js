'use strict';

var cryptojs = require('crypto-js');

var create = function(app) {
    var config = app.config;
    var errs = app.errors;
    var modules = app.modules;
    var User = app.models.user;
    
    let task = function(req, res) {
        let body = req.body;

        body.password = cryptojs.AES.encrypt(body.password, config.encKey).toString();
        
        let user = new User(body);
        let promise = user.save();
        promise.then(function(instance) {
            res.status(201).json({ id:  instance._id });
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = create;