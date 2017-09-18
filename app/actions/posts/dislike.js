'use strict'

let like = app => {
    let errs = app.errors
    let Post = app.models.post
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = post => {
            post.likes.pull(userId)
            post.save()
            let query = User.findById(userId)
                let promise = query.exec()
                promise.catch(EXCEPTION).done(user => {
                    if (user.score > 0) user.score -= 1
                    user.save()
                    res.status(204).send()
                })
        }
        
        let userId = req.params.userId
        let postId = req.params.postId
        
        if (!userId || !postId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Post.findById(postId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = like