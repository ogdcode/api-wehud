'use strict'

const Q = require('q')

let follow = app => {
    let errs = app.errors
    let User = app.models.user
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let currentUser = req.session.user
        let userId = req.params.userId
        let page = req.body.page
        
        if (!currentUser || !userId || !page)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let promises = []
        
        let query = User.findById(userId)
        promises.push(query.exec())
        
        query = Page.findOne({ 'owner._id': currentUser._id, title: page })
        promises.push(query.exec())
        
        Q.all(promises).catch(EXCEPTION).done(values => {
            let user = values[0]
            let page = values[1]
            
            if (!user || !page)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else {
                let reward = {}
                if (currentUser.score < 400) {
                    currentUser.score += 2
                    if (currentUser.score >= 400) reward = app.modules.utils.getReward(400, 3)
                }
                else currentUser.score += 3
                
                let newFollower = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    email: currentUser.email
                }
                
                user.followers.push(newFollower)
                page.users.push(userId)
                
                currentUser.save()
                user.save()
                page.save()
                
                res.status(200).json({ follower: newFollower, following: user.username, reward: reward })
            }
        })
    }
    
    return task
}

module.exports = follow