'use strict'

const Q = require('q')

let unfollow = app => {
    let errs = app.errors
    let User = app.models.user
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let currentUser = req.session.user
        let userId = req.params.userId
        
        if (!currentUser || !userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let promises = []
        
        let query = User.findById(userId)
        promises.push(query.exec())
        
        query = Page.find({ 'owner._id': currentUser._id })
        promises.push(query.exec())
        
        Q.all(promises).catch(EXCEPTION).done(values => {
            let user = values[0]
            let pages = values[1]
            
            if (!user || !pages)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else {
                if (currentUser.score <= 300) currentUser.score -= 2
                else currentUser.score -= 3
                
                let oldFollower = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    email: currentUser.email
                }
                
                currentUser.save()
                
                user.followers.pull(oldFollower)
                user.save()
                
                pages.forEach(page => {
                    page.users.forEach(uId => {
                        if (uId.equals(userId)) {
                            page.users.pull(uId)
                            page.save()
                        }
                    })
                })
                
                res.status(200).json({ follower: oldFollower, unfollowing: user.username })
            }
        })
    }
    
    return task
}

module.exports = unfollow