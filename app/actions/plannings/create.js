'use strict'

let create = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = planning => {
            let reward = {}
            if (currentUser.score < 50) {
                currentUser.score += 1
                if (currentUser.score >= 50) reward = app.modules.utils.getReward(50)
            }
            else if (currentUser.score >= 50 && currentUser.score < 250) {
                currentUser.score += 2
                if (currentUser.score >= 250) reward = app.modules.utils.getReward(250)
            }
            else if (currentUser.score >= 250 && currentUser.score < 550) {
                currentUser.score += 3
                if (currentUser.score >= 550) reward = app.modules.utils.getReward(550)
            }
            else currentUser.score += 5
            currentUser.save()
            
            res.status(201).json({ _id: planning._id, title: planning.title, reward: reward })
        }
        
        let currentUser = req.session.user
        let body = req.body
        
        if (!currentUser || !body || !body.title)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        body.creator = {
            _id: currentUser._id,
            username: currentUser.username
        }
        
        let planning = new Planning(body)
        let promise = planning.save()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = create