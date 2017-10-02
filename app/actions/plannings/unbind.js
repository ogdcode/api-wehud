'use strict'

let unbind = app => {
    let errs = app.errors
    let Planning = app.models.planning
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
        let planningId = req.params.planningId
        
        if (!planningId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.findById(planningId)
        let promise = query.exec()
        
        promise.then(planning => {
            if (!planning)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            if (planning.events.length > 0) {
                planning.events = []
                planning.save()
            }
            
            let query = Event.find({ planning: planning.title })
            let promise = query.exec()
            
            promise.catch(EXCEPTION).done(events => {
                events.forEach(event => {
                    event.planning = ""
                    event.save()
                })
                
                return res.status(204).send()
            })
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = unbind