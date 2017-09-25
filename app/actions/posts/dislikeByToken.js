'use strict'

let like = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = post => {
            post.likes.pull(userId)
            post.save()
            
            let entity = app.config.entity
            let updated = app.modules.utils.updateScore(currentUser.score, 
                                            entity.thresholds.posts, 
                                            entity.actions.posts[0], 
                                            [entity.name.posts], 
                                            entity.points.posts[0], 1)
            currentUser.score = updated.score
            currentUser.save()
            
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