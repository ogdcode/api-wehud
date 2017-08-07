'use strict'

let del = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let eventId = req.params.eventId
        
        if (!eventId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Event.findById(eventId)
        let promise = query.exec()
        
        promise.then(event => {
            let query = Planning.find()
            let promise = query.exec()
            
            promise.then(plannings => {
                plannings.forEach(planning => {
                    if (planning.events && planning.events.includes(event)) {
                        planning.events.pull(event)
                        planning.save()
                    }
                })
                
                event.remove()
                
                res.status(204).send()
            })
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = del