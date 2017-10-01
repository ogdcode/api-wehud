'use strict'

let posts = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = posts => {
            let results = []
            posts.forEach(post => {
                if (post.publisher._id == userId)
                    results.push(post)
            })
            
            return res.status(200).json(results)
        }
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Post.find()
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = posts