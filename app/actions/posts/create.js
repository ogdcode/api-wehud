'use strict'

let create = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = (post) => res.status(201).json({ _id: post._id })
        
        let body = req.body
        let currentUser = req.session.user
        
        if (!body || !body.text || !currentUser)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        body.publisher = {
            _id: currentUser._id,
            username: currentUser.username
        }
        
        let post = new Post(body)        
        let promise = post.save()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = create