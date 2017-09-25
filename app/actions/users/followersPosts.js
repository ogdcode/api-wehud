'use strict'

const Q = require('q')

let followersPosts = app => {
    let errs = app.errors
    let User = app.models.user
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = posts => { return res.status(200).json(posts) }
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.findById(userId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(user => {
            let promises = []
            user.followers.forEach(follower => {
                let query = Post.find({ 'publisher._id': follower._id })
                let promise = query.exec()
                promises.push(promise)
            })

            Q.all(promises).spread(RESPONSE).catch(EXCEPTION).done()
            
        })
    }
    
    return task
}

module.exports = followersPosts