'use strict'

let unfollow = app => {
    let errs = app.errors
    let Game = app.models.game
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let currentUser = req.session.user
        let gameId = req.params.gameId
        
        if (!currentUser || !gameId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Game.findById(gameId)
        let promise = query.exec()
        
        promise.then(game => {
            if (!game)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else {
                let oldFollower = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    email: currentUser.email
                }
                
                game.followers.pull(oldFollower)
                game.save()
                
                res.status(200).json({ unfollowing: game.name })
            }
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = unfollow