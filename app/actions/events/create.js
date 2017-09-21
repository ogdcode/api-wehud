'use strict'

let create = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = event => {
            let reward = {}
            if (currentUser.score < 70) {
                currentUser.score += 1
                if (currentUser.score >= 70) reward = app.modules.utils.getReward(70)
            } 
            else if (currentUser.score >= 70 && currentUser.score < 370) {
                currentUser.score += 2
                if (currentUser.score >= 370) reward = app.modules.utils.getReward(370)
            }
            else currentUser.score += 3
            
            res.status(201).json({ _id: event._id, title: event.title, reward: reward })
        }
        
        let currentUser = req.session.user
        let body = req.body
        
        if (!currentUser || !body || !body.title)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        if (body.startDateTime >= body.endDateTime)
            return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
        
        body.creator = {
            _id: currentUser._id,
            username: currentUser.username
        }
        
        if (body.planning) {
            let query = Planning.findOne({ title: body.planning })
            let promise = query.exec()
            
            promise.then(planning => {
                if (!planning)
                    return res.status(404).json({ error: errs.ERR_NOTFOUND })
                
                let event = new Event(body)
                
                planning.events.push(event)
                planning.save()
                
                let promise = event.save()
                
                promise.catch(EXCEPTION).done(RESPONSE)
            })
        } else {
            let event = new Event(body)
            let promise = event.save()

            promise.catch(EXCEPTION).done(RESPONSE)
        }
    }
    
    return task
}

module.exports = create