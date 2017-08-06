'use strict'

let update = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = (user) => res.status(200).json(user)
        
        var currentUserId = req.session.user._id
        let body = req.body
        
        if (!currentUserId || !body)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        if (body.password) {
            body.password = app.modules.encryption.encrypt(app, body.password)
        }
        
        let query = User.findByIdAndUpdate(currentUserId, body)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    };
    
    return task
};

module.exports = update