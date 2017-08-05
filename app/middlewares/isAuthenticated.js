'use strict';

let isAuthenticated = function(app) {
    var errs = app.errors;
    var User = app.models.user;
    
    let task = function(req, res, next) {
        let header = req.header('Authorization').split(' ');
        
        if (header[0] !== 'Bearer') {
            res.status(403).json({ error: errs.ERR_UNAUTHORIZED });
        }
        
        let token = header[1];
        
        let decoded = app.modules.jwt.verifyToken(app, token);
        
        let findUser = User.findById(decoded._id);
        let promise = findUser.exec();
        
        promise.then(function(user) {
            if (!user) {
                res.status(404).json({ error: errs.ERR_NOTFOUND });
            } else {
                req.session = {
                    user: user,
                    token: token
                }
                
                next();
            }
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = isAuthenticated;