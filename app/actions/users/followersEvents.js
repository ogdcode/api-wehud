'use strict'

const Q = require('q')

let followersEvents = app => {
    let errs = app.errors
    let User = app.models.user
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = events => res.status(200).json(events)
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.findById(userId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(user => {
            let promises = []
            user.followers.forEach(follower => {
                let query = Event.find({ 'creator._id': follower._id })
                let promise = query.exec()
                promises.push(promise)
            })

            Q.all(promises).spread(RESPONSE).catch(EXCEPTION).done()
            
        })
    }
    
    return task
}

module.exports = followersEvents