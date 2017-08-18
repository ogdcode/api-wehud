'use strict'

let update = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = () => res.status(204).send()
        
        let body = req.body
        let eventId = req.params.eventId
        
        if (!body || !eventId)
            return res.status(400).json({ error: errs.BADREQUEST })
        
        let query = Event.findById(eventId)
        let promise = query.exec()
        
        promise.then(event => {
            let oldEvent = event
            
            if (body.startDate && body.startDate <= event.endDate)
                event.startDate = body.startDate
            
            if (body.endDate && body.endDate >= event.startDate)
                event.endDate = body.endDate
            
            if (body.title)
                event.title = body.title
            
            if (body.description)
                event.description = body.description
            
            if (body.tag)
                event.tag = body.tag
            
            let query = Planning.find()
            let promise = query.exec()
            
            promise.then(plannings => {
                plannings.forEach(planning => {
                    if (planning.events && planning.events.includes(oldEvent)) {
                        planning.events.pull(oldEvent)
                        planning.events.push(event)
                        planning.save()
                    }
                })
                
                let promise = event.save()
                
                promise.catch(EXCEPTION).done(RESPONSE)
            })
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = update