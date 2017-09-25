'use strict'

const Q = require('q')

let games = app => {
    let errs = app.errors
    let User = app.models.user
    let Game = app.models.game
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = games => {
            let followedGames = []
            games.forEach(game => {
                game.followers.forEach(user => {
                    if (user._id.equals(userId)) {
                        followedGames.push(game)
                    }
                })
            })
            
            return res.status(200).json(games)
        }
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Game.find()
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = games