'use strict'

const Q = require('q')

let follow = app => {
    let errs = app.errors
    let Game = app.models.game
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
        let currentUser = req.session.user
        let gameId = req.params.gameId
        let page = req.body.page
        
        if (!currentUser || !gameId || !page)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let promises = []
        
        let query = Game.findById(gameId)
        promises.push(query.exec())
        
        query = Page.findOne({ 'owner._id': currentUser._id, title: page })
        promises.push(query.exec())
        
        Q.all(promises).catch(EXCEPTION).done(values => {
            let game = values[0]
            let page = values[1]
            
            if (!game || !page)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })

            let newFollower = {
                _id: currentUser._id,
                username: currentUser.username,
                email: currentUser.email
            }

            game.followers.push(newFollower)
            page.games.push(gameId)
            
            let entity = app.config.entity
            let updated = app.modules.utils.updateScore(currentUser.score, 
                                                        entity.thresholds.games, 
                                                        entity.actions.games[1], [entity.name.games.substring(
                                                            0, entity.name.games.length - 1)], 
                                                        entity.points.games)
            currentUser.score = updated.score.total
            currentUser.save()
            
            game.save()
            page.save()

            return res.status(200).json({ 
                follower: newFollower, 
                following: game.name, 
                reward: updated.reward 
            })
        })
    }
    
    return task
}

module.exports = follow