'use strict'

let read = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let userId = req.params.userId
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.findById(userId)
        let promise = query.exec()
        
        promise
            .then(instance => res.status(200).json(instance))
            .catch(EXCEPTION)
    }
    
    return task
}

module.exports = read