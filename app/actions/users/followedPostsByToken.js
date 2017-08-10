'use strict'

let list = app => {
    let errs = app.errors
    let User = app.models.user
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = posts => res.status(200).json(posts)
        
        let userId = req.session.user._id
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.findById(userId)
        let promise = query.exec()
        
        promise.then(user => {
            if (!user)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            let query = Post.find({ publisher: user })
            let promise = query.exec()

            promise.then(RESPONSE).catch(EXCEPTION)
        })
    }
    
    return task
}

module.exports = list