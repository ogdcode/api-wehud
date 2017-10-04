'use strict'

let logout = app => {    
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
        let currentUser = req.session.user
        let uId = currentUser._id.toString()
        currentUser.connected = false
        currentUser.save()
        
        let f = {
                _id: currentUser._id,
                username: currentUser.username,
                email: currentUser.email,
                avatar: currentUser.avatar,
                connected: false
        }
        
        delete req.session
        currentUser.token = null
        
        let query = User.find()
        let promise = query.exec()
        promise.catch(EXCEPTION).done(users => {
            users.forEach(user => {
                user.followers.forEach(follower => {
                    let fId = follower._id.toString()
                    if (fId === uId) {
                        user.followers.pull(follower)
                        if (user.followers.indexOf(f) < 0) user.followers.push(f)
                    }
                })
                user.save()
            })
        })
        
        if (!req.session)
            return res.status(204).send()
        
        return res.status(500).json({ error: errs.ERR_SERVER })
    }
    
    return task
}

module.exports = logout