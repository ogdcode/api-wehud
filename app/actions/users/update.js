'use strict'

let update = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = () => res.status(204).send()
        
        let body = req.body
        let userId = req.params.userId
        
        if (!body)
            return res.status(400).json({ error: errs.ERR_SERVER })
        
        if (body.password)
            body.password = app.modules.encryption.encrypt(app, body.password)
        
        let query = User.findByIdAndUpdate(userId, body)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = update