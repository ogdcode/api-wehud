'use strict'

let unbind = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let planningId = req.params.planningId
        
        if (!planningId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.findById(planningId)
        let promise = query.exec()
        
        promise.then(planning => {
            if (!planning)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else if (planning.events.length > 0) {
                planning.events.forEach(event => {
                    planning.events.pull(event)
                    event.remove()
                })
                
                planning.save()
                
                res.status(204).send()
            } else
                res.status(204).send()
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = unbind