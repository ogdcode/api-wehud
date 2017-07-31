'use strict';

var logout = function(app) {
    var errs = app.errors;
    var Token = app.models.token;
    
    var task = function(req, res) {
        var query = Token.findByIdAndRemove(req.token.value);
        var promise = query.exec();
        
        promise.then(function() {
            res.status(204).json({});
        }).catch(function() {
            res.status(500).json({ error: errs.ERR_SERVER });
        });
    };
    
    return task;
};

module.exports = logout;