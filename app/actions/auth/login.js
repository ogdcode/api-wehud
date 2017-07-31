'use strict';

var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

var login = function(app) {
    var config = app.config;
    var errs = app.errors;
    var User = app.models.user;
    var Token = app.models.token;
    
    let task = function(req, res) {
        var body = req.body;
        
        var options = {};
        if (body.usernameOrEmail.indexOf('@') !== -1) {
            options.email = body.usernameOrEmail;
        } else {
            options.username = body.usernameOrEmail;
        }
        
        var query = User.findOne(options);
        var promise = query.exec();
        
        promise.then(function(foundUser) {
            if (!foundUser) {
                res.status(404).json({ error: errs.ERR_NOTFOUND });
            } else {
                var userPassword = cryptojs.AES.decrypt(foundUser.password, config.encKey).toString(cryptojs.enc.Utf8);
                
                if (userPassword !== body.password) {
                    res.status(403).json({ error: errs.ERR_INVALIDCREDS });
                } else {
                                        
                    foundUser.connected = true;
                    
                    foundUser.save();
                    
                    let jwtOptions = {
                        algorithm: config.jwt.algorithm,
                        expiresIn: config.jwt.expiresIn
                    };
                    
                    let tokenVal = jwt.sign({_id: foundUser._id}, config.jwt.secret, jwtOptions);
                    
                    let tokenObj = new Token({
                        value: tokenVal,
                        userId: foundUser._id,
                        expiresIn: config.jwt.expiresIn
                    });
                                        
                    return tokenObj.save();
                }
            }
        }).then(function(result) {
            res.status(200).json({ id: result.userId, token: result.value });
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = login;