'use strict'

let del = app => {
    let errs = app.errors
    let Planning = app.models.planning
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = planning => {
            let query = Event.find({ planning: planning.title })
            let promise = query.exec()
            
            promise.catch(EXCEPTION).done(events => {
                events.forEach(event => {
                    event.planning = ""
                    event.save()
                })
                
                planning.remove()
                
                res.status(204).send()
            })
        }
        
        let planningId = req.params.planningId
        
        if (!planningId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.findById(planningId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = del