'use strict'

let create = function(app) {
    var config = app.config
    var errs = app.errors
    var User = app.models.user
        
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let body = req.body;

        if (!body.email || !body.username || !body.password)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
            
        body.password = app.modules.encryption.encrypt(app, body.password)
        
        let user = new User(body)
        let promise = user.save()
                
        promise
            .then((instance) => res.status(201).json({ _id: instance._id }))
            .catch(EXCEPTION);
    };
    
    return task
};

module.exports = create;