'use strict'

const Q = require('q')

let list = app => {
    let errs = app.errors
    let User = app.models.user
    let Game = app.models.game
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Game.find()
        let promise = query.exec()
        
        promise.then(games => {
            let games = []
            games.forEach(game => {
                game.followers.forEach(user => {
                    if (user._id.equals(userId)) {
                        games.push(game)
                    }
                })
            })
            
            res.status(200).json(games)
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = list