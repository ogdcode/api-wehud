'use strict'

let messages = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = posts => { return res.status(200).json(posts) }
        
        let userId = req.session.user._id
                
        let query = Post.find({ 'receiver._id': userId })
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = messages