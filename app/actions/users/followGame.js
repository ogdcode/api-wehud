'use strict'

const Q = require('q')

let follow = app => {
    let errs = app.errors
    let Game = app.models.game
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
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
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else {
                let newFollower = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    email: currentUser.email
                }
                
                game.followers.push(newFollower)
                page.games.push(gameId)
                
                game.save()
                page.save()
                
                res.status(200).json({ following: game.name })
            }
        })
    }
    
    return task
}

module.exports = follow