'use strict'

let like = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = post => {
            post.likes.push(userId)
            post.save()
            res.status(204).send()
        }
        
        let userId = req.params.userId
        let postId = req.params.postId
        
        if (!userId || !postId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Post.findById(postId)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = like