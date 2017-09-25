'use strict'

let create = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = planning => {
            
            let entity = app.config.entity
            let updated = app.modules.utils.updateScore(currentUser.score, 
                                                        entity.thresholds.plannings,
                                                        entity.actions.plannings[0],
                                                        [entity.name.plannings],
                                                        entity.points.plannings, 0)
            
            currentUser.score = updated.score.total
            currentUser.save()
            
            return res.status(201).json({ 
                _id: planning._id, 
                title: planning.title, 
                reward: updated.reward 
            })
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