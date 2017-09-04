'use strict'

let update = app => {
    let errs = app.errors
    let Planning = app.models.planning
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = planning => {
            if (body.title) {
                let query = Event.find({ planning: planning.title })
                let promise = query.exec()

                promise.catch(EXCEPTION).done(events => {
                    events.forEach(event => {
                        event.planning = body.title
                        event.save()
                    })
                    
                    res.status(204).send()
                })
            } else res.status(204).send()
        }
        
        let planningId = req.params.planningId
        let body = req.body
        
        if (!planningId || !body)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.findByIdAndUpdate(planningId, body)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = update