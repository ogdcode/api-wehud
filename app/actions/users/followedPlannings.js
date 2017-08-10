'use strict'

const Q = require('q')

let list = app => {
    let errs = app.errors
    let User = app.models.user
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = plannings => res.status(200).json(plannings)
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.find()
        let promise = query.exec()
        
        promise.then(users => {
            let promises = []
            users.forEach(user => {
                user.followers.forEach(u => {
                    if (u._id.equals(userId)) {
                        let query = Planning.find({ 'creator._id': user._id })
                        let promise = query.exec()
                        promises.push(promise)
                    }
                })
            })
            
            Q.allSettled(promises).spread(RESPONSE).catch(EXCEPTION).done()
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = list