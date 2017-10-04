'use strict'

const Q = require('q')

let follow = app => {
    let errs = app.errors
    let User = app.models.user
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
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
                return res.status(404).json({ error: errs.ERR_NOTFOUND })

            let newFollower = {
                _id: currentUser._id,
                username: currentUser.username,
                email: currentUser.email,
                avatar: currentUser.avatar,
                connected: currentUser.connected
            }

            if (user.followers.indexOf(newFollower) < 0) user.followers.push(newFollower)
            if (page.users.indexOf(userId) < 0) page.users.push(userId)
            
            let entity = app.config.entity
            
            let userSubstr = entity.name.users.substring(0, entity.name.users.length - 1)
            let gameSubstr = entity.name.games.substring(0, entity.name.games.length - 1)
            
            let updated = app.modules.utils.updateScore(currentUser.score, 
                                                        entity.thresholds.users, 
                                                        entity.actions.users[1], 
                                                        [userSubstr, gameSubstr],
                                                        entity.points.users, 0)
            currentUser.score = updated.score.total
            currentUser.save()
            user.save()
            page.save()

            return res.status(200).json({ 
                follower: newFollower, 
                following: user.username, 
                reward: updated.reward 
            })  
        })
    }
    
    return task
}

module.exports = follow