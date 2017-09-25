'use strict'

let read = app => {
    let Game = app.models.game
    let errs = app.errors
    
    let request = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = game => {
            if (!game)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            return res.status(200).json(game)
        }
        
        let gameId = req.params.gameId
        
        if (!gameId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Game.findById(gameId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return request
}

module.exports = read