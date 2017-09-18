'use strict'

const Q = require('q')

let create = app => {
    let errs = app.errors
    let Post = app.models.post
    let User = app.models.user
    let Game = app.models.game
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = post => {
            if (currentUser.score < 200) currentUser.score += 1
            else currentUser.score += 2
            currentUser.save()
            res.status(201).json({ _id: post._id })
        }
        
        let body = req.body
        let currentUser = req.session.user
        
        if (!body || !body.text || !currentUser)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
                
        body.publisher = {
            _id: currentUser._id,
            username: currentUser.username
        }
        
        let promises = []
        
        // The body.receiver variable comes as a unique username.
        if (body.receiver) {
            if (body.receiver === currentUser.username)
                return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
            
            let query = User.findOne({ username: body.receiver })
            let promise = query.exec()
            
            promises.push(promise)
        }
        
        if (body.game) {
            let query = Game.findOne({ name: body.game })
            let promise = query.exec()
            
            promises.push(promise)
        }
        
        if (promises.length > 0) {
            Q.all(promises).then(results => {
                results.forEach(result => {
                    
                    // If result has a username, then it is a User object.
                    if (result.username)
                        body.receiver = {
                            _id: result._id,
                            username: result.username
                        }
                    
                    // If result has a name, then it is a Game object.
                    if (result.name)
                        body.game = {
                            _id: result._id,
                            name: result.name
                        }     
                })
                                
                let post = new Post(body)
                let promise = post.save()
                
                promise.catch(EXCEPTION).done(RESPONSE)
            })
        } else {
            let post = new Post(body)        
            let promise = post.save()

            promise.catch(EXCEPTION).done(RESPONSE)
        }
    }
    
    return task
}

module.exports = create