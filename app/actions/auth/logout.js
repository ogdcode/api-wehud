'use strict';

let logout = function(app) {    
    let errs = app.errors
    
    let task = function(req, res) {
        let currentUser = req.session.user
        currentUser.connected = false
        currentUser.save()
        
        delete req.session;
        
        if (!req.session)
            res.status(204).send()
        else
            res.status(500).json({ error: errs.ERR_SERVER })
    };
    
    return task;
};

module.exports = logout;