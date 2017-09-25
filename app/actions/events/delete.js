'use strict'

let del = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    let User = app.models.user
    
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
        let eventId = req.params.eventId
        
        if (!eventId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Event.findById(eventId)
        let promise = query.exec()
        
        promise.then(event => {
            let query = Planning.find()
            let promise = query.exec()
            
            let query2 = User.findById(event.creator._id)
            let promise2 = query2.exec()
            
            promise.then(plannings => {
                plannings.forEach(planning => {
                    if (planning.events && planning.events.includes(event)) {
                        planning.events.pull(event)
                        planning.save()
                    }
                })
                
                event.remove()
                
                return res.status(204).send()
            })
            
            promise2.catch(EXCEPTION).done(creator => {
                let entity = app.config.entity
                let updated = app.modules.utils.updateScore(creator.score, 
                                                            entity.thresholds.events, entity.actions.events[0], 
                                                            [entity.name.events], 
                                                            entity.points.events[0], 1)
                creator.score = updated.score
                creator.save()
            })
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = del