'use strict'

const Q = require('q')

let list = app => {
    let errs = app.errors
    let User = app.models.user
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = events => res.status(200).json(events)
        
        let userId = req.session.user._id
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.find()
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(users => {
            let promises = []
            users.forEach(user => {
                user.followers.forEach(u => {
                    if (u._id.equals(userId)) {
                        let query = Event.find({ 'creator._id': user._id })
                        let promise = query.exec()
                        promises.push(promise)
                    }
                })
            })
            
            Q.all(promises).spread(RESPONSE).catch(EXCEPTION).done()
        })
    }
    
    return task
}

module.exports = list