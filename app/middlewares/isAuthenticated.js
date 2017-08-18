'use strict'

let isAuthenticated = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res, next) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = user => {
            if (!user)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else if (!user.token || user.token !== token)
                res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
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
                
        let query = User.findById(decoded._id)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    };
    
    return task
};

module.exports = isAuthenticated