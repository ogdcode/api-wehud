'use strict'

let list = function(app) {
    let errs = app.errors
    let Game = app.models.game
    
    let request = function(req, res) {
        let query = Game.find()
        let promise = query.exec()
        
        promise
            .then(response => res.status(200).json(response))
            .catch(reason => res.status(500).json({ error: errs.ERR_SERVER }))
    }
    
    return request
}

module.exports = list