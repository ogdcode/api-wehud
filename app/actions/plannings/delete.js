'use strict'

let del = app => {
    let errs = app.errors
    let Planning = app.models.planning
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = () => res.status(204).send()
        
        let planningId = req.params.planningId
        
        if (!planningId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.findByIdAndRemove(planningId)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = del