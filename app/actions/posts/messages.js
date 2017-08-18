'use strict'

let messages = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = posts => res.status(200).json(posts)
        
        let userId = req.params.userId
        
        let query = Post.find({ 'receiver._id': userId })
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = messages