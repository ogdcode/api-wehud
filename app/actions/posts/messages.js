'use strict'

let messages = app => {
    let errs = app.errors
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = posts => { 
            let results = []
            posts.forEach(post => {
                if (post.receiver && post.receiver._id == userId) results.push(post)
            })
            
            return res.status(200).json({ _id: userId, posts: results })
        }
        
        let userId = req.params.userId
        
        let query = Post.find()
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = messages