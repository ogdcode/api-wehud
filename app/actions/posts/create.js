'use strict'

const Q = require('q')

let create = app => {
    let errs = app.errors
    let Post = app.models.post
    let User = app.models.user
    let Game = app.models.game
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = post => {
            let entity = app.config.entity
            let updated = app.modules.utils.updateScore(currentUser.score, 
                                                        entity.thresholds.posts, 
                                                        entity.actions.posts[0], 
                                                        [entity.name.posts], 
                                                        entity.points.posts[1], 0)
            currentUser.score = updated.score.total
            currentUser.score += additionalScore
            currentUser.save()
            
            return res.status(201).json({ _id: post._id, reward: updated.reward })
        }
        
        let body = req.body
        let currentUser = req.session.user
        let additionalScore = 0
        
        if (!body || !body.text || !currentUser)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
                
        body.publisher = {
            _id: currentUser._id,
            avatar: currentUser.avatar,
            username: currentUser.username
        }
        
        let promises = []
        
        // The body.receiver variable comes as a unique username.
        if (body.receiver) {
            if (currentUser.score <= 200) additionalScore += 1
            else additionalScore += 2
            if (body.receiver === currentUser.username)
                return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
            
            let query = User.findOne({ username: body.receiver })
            let promise = query.exec()
            
            promises.push(promise)
        }
        
        if (body.game) {
            if (currentUser.score <= 200) additionalScore += 1
            else additionalScore += 2
            let query = Game.findOne({ name: body.game })
            let promise = query.exec()
            
            promises.push(promise)
        }
        
        if (promises.length > 0) {
            Q.all(promises).then(results => {
                results.forEach(result => {
                    
                    // If result has a username, then it is a User object.
                    if (result.username) {
                        body.receiver = {
                            _id: result._id,
                            username: result.username
                        }
                        body.message = true
                    }
                    
                    // If result has a name, then it is a Game object.
                    if (result.name) {
                        body.game = {
                            _id: result._id,
                            name: result.name
                        }
                        body.opinion = true
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