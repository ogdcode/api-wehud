'use strict'

let unfollow = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let currentUser = req.session.user
        let userId = req.params.userId
        
        if (!currentUser || !userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.findById(userId)
        let promise = query.exec()
        
        promise.then(user => {
            if (!user)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else {
                let oldFollower = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    email: currentUser.email
                }
                
                user.followers.pull(oldFollower)
                user.save()
                
                res.status(200).json({ unfollowing: currentUser.username })
            }
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = unfollow