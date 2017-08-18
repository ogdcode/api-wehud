'use strict'

let list = app => {
    let errs = app.errors
    let Game = app.models.game
    
    let request = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = games => res.status(200).json(games)
        
        let query = Game.find()
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return request
}

module.exports = list