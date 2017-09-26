'use strict'

let update = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = () => { return res.status(204).send() }
        
        let body = req.body
        let postId = req.params.postId
        
        if (body.publisher || body.receiver)
            return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
        
        if (!body || !postId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
                
        let query = Post.findByIdAndUpdate(postId, body)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = update