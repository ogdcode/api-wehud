'use strict'

let isAuthenticated = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res, next) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = user => {
            if (!user)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else {
                req.session = {
                    user: user,
                    token: token
                }
                
                next()
            }
        }
        
        let token = req.query.token
        
        if (!token)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let decoded = app.modules.jwt.verifyToken(app, token)
        
        let findUser = User.findById(decoded._id)
        let promise = findUser.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    };
    
    return task
};

module.exports = isAuthenticated