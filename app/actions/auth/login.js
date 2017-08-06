'use strict'

let login = app => {
    let config = app.config
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let body = req.body
        
        if (!body || !body.usernameOrEmail || !body.password)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let options = {}
        if (body.usernameOrEmail.indexOf('@') !== -1) 
            options.email = body.usernameOrEmail
        else 
            options.username = body.usernameOrEmail
        
        options.password = app.modules.encryption.encrypt(app, body.password)
        
        let query = User.findOne(options)
        let promise = query.exec()
        
        promise.then(foundUser => {
            if (!foundUser)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else {
                if (foundUser.password !== options.password)
                    res.status(403).json({ error: errs.ERR_INVALIDCREDS })
                else {
                    foundUser.connected = true
                    foundUser.save()
                    
                    let token = app.modules.jwt.generateToken(app, foundUser._id)
                    
                    res.status(200).json({ id: foundUser._id, token: token })
                }
            }
        }).catch(EXCEPTION)
    };
    
    return task
};

module.exports = login