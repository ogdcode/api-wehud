'use strict'

const Q = require('q')

let unfollow = app => {
    let errs = app.errors
    let Game = app.models.game
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let currentUser = req.session.user
        let gameId = req.params.gameId
        
        if (!currentUser || !gameId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let promises = []
        
        let query = Game.findById(gameId)
        promises.push(query.exec())
        
        query = Page.find({ 'owner._id': currentUser._id })
        promises.push(query.exec())
        
        Q.all(promises).catch(EXCEPTION).done(values => {
            let game = values[0]
            let pages = values[1]
            
            if (!game || !pages)
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
                
                game.followers.pull(oldFollower)
                game.save()
                
                pages.forEach(page => {
                    page.games.forEach(gId => {
                        if (gId.equals(gameId)) {
                            page.games.pull(gId)
                            page.save()
                        }
                    })
                })
                
                res.status(200).json({ follower: oldFollower, unfollowing: game.name })
            }
        })
    }
    
    return task
}

module.exports = unfollow