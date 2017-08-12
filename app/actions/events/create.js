'use strict'

let create = app => {
    let errs = app.errors
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = event => res.status(201).json({ _id: event._id })
        
        let body = req.body
        
        if (!body)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        if (body.startDate >= body.endDate)
            return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
        
        let event = new Event(body)
        event.save().then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = create