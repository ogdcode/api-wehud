'use strict';

var cryptojs = require('crypto-js');

var update = function(app) {
    var config = app.config;
    var errs = app.errors;
    var User = app.models.user;
    
    let task = function(req, res) {
        var currentUser = req.session.user;
        let body = req.body;
        
        if (body.password) {
            body.password = cryptojs.AES.encrypt(body.password, config.encKey).toString();
        }
        
        let query = User.findOne({$or: [{username: body.username}, {email: body.email}]});
        
        let promise = query.exec();
        promise.then(function(foundUser) {
            if (foundUser && !foundUser._id.equals(currentUser._id)) {
                res.status(403).json({ error: errs.ERR_UNAUTHORIZED });
            } else {
                return User.update({ _id: currentUser._id }, body);
            }
        }).then(function() {
            res.status(200).json({ _id: currentUser._id });
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = update;