'use strict'

let read = function(app) {
    let Game = app.models.game
    let errs = app.errors
    
    let request = function(req, res) {
        let gameId = req.query.id
        
        let query = Game.findById(gameId)
        let promise = query.exec()
        
        promise
            .then(response => res.status(200).json(response))
            .catch(() => res.status(500).json({ error: errs.ERR_SERVER }))
    }
    
    return request
}

module.exports = read