'use strict'

let unbind = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = () => res.status(204).send()
        
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
                
                planning.events.pull(event)
                planning.save().then(RESPONSE).catch(EXCEPTION)
            })
        })
    }
    
    return task
}

module.exports = unbind