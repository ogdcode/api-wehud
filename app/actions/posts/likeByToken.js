'use strict'

let like = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = post => {
            if (userId.equals(post.publisher._id))
                return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
            
            post.likes.forEach(like => {
                if (like.equals(userId))
                    return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
            })
            
            post.likes.push(userId)
            post.save()

            let reward = {}
            if (currentUser.score < 100) {
                currentUser.score += 1
                if (currentUser.score >= 100) reward = app.modules.utils.getReward(100, 2)
            }
            else currentUser.score += 2
            currentUser.save()

            if (!app.modules.utils.isEmpty(reward)) return res.status(200).json(reward)

            res.status(204).send()
        }
        
        let currentUser = req.session.user
        let userId = currentUser._id
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