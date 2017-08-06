'use strict'

let isAuthenticated = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res, next) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let header = req.header('Authorization')
        if (!header)
            return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
        
        header = header.split(' ')
        
        if (header[0] !== 'Bearer')
            return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
        
        let token = header[1]
        
        let decoded = app.modules.jwt.verifyToken(app, token)
        
        let findUser = User.findById(decoded._id)
        let promise = findUser.exec()
        
        promise.then(user => {
            if (!user) {
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            } else {
                req.session = {
                    user: user,
                    token: token
                }
                
                next()
            }
        }).catch(EXCEPTION)
    };
    
    return task
};

module.exports = isAuthenticated