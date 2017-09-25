'use strict'

let like = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = post => {
            if (userId.equals(post.publisher._id))
                return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
            
            post.likes.forEach(like => {
                if (like.equals(userId))
                    return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
            })
            
            post.likes.push(userId)
            post.save()

            let utils = app.modules.utils
            let entity = app.config.entity

            let updated = utils.updateScore(currentUser.score, 
                                            entity.thresholds.posts, 
                                            entity.actions.posts[0], 
                                            [entity.name.posts], 
                                            entity.points.posts[0])
            currentUser.score = updated.score.total
            currentUser.save()

            if (!utils.isEmpty(updated.reward)) 
                return res.status(200).json(updated.reward)

            return res.status(204).send()
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