'use strict'

const Q = require('q')

let followersPlannings = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = plannings => { return res.status(200).json(plannings) }
        
        let currentUser = req.session.user
        
        if (!currentUser)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let promises = []
        currentUser.followers.forEach(follower => {
            let query = Planning.find({ 'creator._id': follower._id })
            let promise = query.exec()
            promises.push(promise)
        })
        
        Q.all(promises).spread(RESPONSE).catch(EXCEPTION).done()
    }
    
    return task
}

module.exports = followersPlannings