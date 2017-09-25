'use strict'

let read = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = (post) => {
            if (!post)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            return res.status(200).json(post)
        }
        
        let postId = req.params.postId
        
        if (!postId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Post.findById(postId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = read