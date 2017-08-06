'use strict'

let del = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.findById(userId)
        let promise = query.exec()
        
        promise.then(currentUser => {
            let query = User.find()
            let promise = query.exec()
            
            promise.then(users => {
                users.forEach(user => {
                    let followers = user.followers
                    followers.forEach(u => {
                        if (u._id.equals(userId)) {
                            followers.pull(u)
                            user.save()
                        }
                    })
                })
                
                currentUser.remove()
                
                res.status(204).send()
            }).catch(EXCEPTION)
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = del