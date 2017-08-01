'use strict';

let login = function(app) {
    var config = app.config;
    var errs = app.errors;
    var User = app.models.user;
    
    let task = function(req, res) {
        var body = req.body;
        
        var options = {};
        if (body.usernameOrEmail.indexOf('@') !== -1) {
            options.email = body.usernameOrEmail;
        } else {
            options.username = body.usernameOrEmail;
        }
        options.password = app.modules.encryption.encrypt(app, body.password);
        
        var query = User.findOne(options);
        var promise = query.exec();
        
        promise.then(function(foundUser) {
            if (!foundUser) {
                res.status(404).json({ error: errs.ERR_NOTFOUND });
            } else {                
                if (foundUser.password !== options.password) {
                    res.status(403).json({ error: errs.ERR_INVALIDCREDS });
                } else {
                    foundUser.connected = true;
                    foundUser.save();
                    
                    let token = app.modules.jwt.generateToken(app, foundUser._id);
                    
                    res.status(200).json({ id: foundUser._id, token: token });
                    
                }
            }
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = login;