'use strict';

var isAuthenticated = function(app) {
    var errs = app.errors;
    var Token = app.models.token;
    var User = app.models.user;
    
    let task = function(req, res, next) {
        var tokenVal = req.header('X-Access-Token');
    
        let findToken = Token.findOne({ value:  tokenVal });
        let promise = findToken.exec();

        promise.then(function(foundToken) {
            var userId = foundToken.userId;

            var findUser = User.findById(userId);
            return findUser.exec();
        }).then(function(foundUser) {
            if (!foundUser) {
                res.status(404).json({ error: errs.ERR_NOTFOUND });
            } else {
                req.session = req.session || {};
                req.session.user = foundUser;
                req.session.token = tokenVal;
                                
                next();
            }
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = isAuthenticated;