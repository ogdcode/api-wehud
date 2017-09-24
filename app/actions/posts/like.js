'use strict'

let like = app => {
    let errs = app.errors
    let Post = app.models.post
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = post => {
            if (userId.equals(post.publisher._id))
                res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
            else {
                post.likes.forEach(like => {
                    if (like.equals(userId))
                        return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
                })
                post.likes.push(userId)
                post.save()
                
                let query = User.findById(userId)
                let promise = query.exec()
                promise.catch(EXCEPTION).done(user => {
                    let reward = {}
                    if (user.score < 100) {
                        user.score += 1
                        if (user.score >= 100) reward = app.modules.utils.getReward(100, 2)
                    }
                    else user.score += 2
                    user.save()
                    
                    if (!app.modules.utils.isEmpty(reward)) return res.status(200).json(reward)
                    
                    res.status(204).send()
                })
                
            }
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