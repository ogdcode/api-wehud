'use strict'

let create = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = event => res.status(201).json({ _id: event._id, title: event.title })
        
        let currentUser = req.session.user
        let body = req.body
        
        if (!currentUser || !body || !body.title)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        if (body.startDate >= body.endDate)
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