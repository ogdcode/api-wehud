'use strict'

let bind = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = planning => {
            
            let query = User.findById(event.creator._id)
            let promise = query.exec()
            
            promise.catch(EXCEPTION).done(creator => {
                let entity = app.config.entity
                let updated = app.modules.utils.updateScore(creator.score, 
                                                            entity.thresholds.events,
                                                            entity.actions.events[1],
                                                            [entity.name.events],
                                                            entity.points.events[1], 0)
                
                creator.score = updated.score.total
                creator.save()
                
                return res.status(200).send({ 
                    planning: planning.title, 
                    events: planning.events, 
                    reward: updated.reward 
                })
            }) 
        }
        
        let eventId = req.params.eventId
        let body = req.body
        
        if (!eventId || !body || !body.planning)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Event.findById(eventId)
        let promise = query.exec()
        
        promise.then(event => {
            if (!event)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            let query = Planning.findOne({ title: body.planning })
            let promise = query.exec()
            
            promise.then(planning => {
                if (!planning)
                    return res.status(404).json({ error: errs.ERR_NOTFOUND })
                
                event.planning = body.planning
                event.save()
                
                planning.events.push(event)
                
                let promise = planning.save()
                promise.then(RESPONSE).catch(EXCEPTION)
            })
        })
    }
    
    return task
}

module.exports = bind