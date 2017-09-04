'use strict'

let events = app => {
    let errs = app.errors
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = events => {
            let results = []
            events.forEach(event => {
                if (event.creator._id.equals(userId))
                    results.push(event)
            })
            
            res.status(200).json(results)
        }
        
        let userId = req.session.user._id
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Event.find()
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = events