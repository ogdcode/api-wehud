'use strict'

let read = app => {
    let errs = app.errors
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = event => {
            if (!event)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            return res.status(200).json(event)
        }
        
        let eventId = req.params.eventId
        
        if (!eventId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Event.findById(eventId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = read