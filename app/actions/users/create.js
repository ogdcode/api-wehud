'use strict'

let create = app => {
    let config = app.config
    let errs = app.errors
    let User = app.models.user
        
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = user => { return res.status(201).json({ _id: user._id }) }
        
        let body = req.body;

        if (!body.email || !body.username || !body.password)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
            
        body.password = app.modules.encryption.encrypt(app, body.password)
        
        let user = new User(body)
        let promise = user.save()
                
        promise.catch(EXCEPTION).done(RESPONSE)
    };
    
    return task
};

module.exports = create