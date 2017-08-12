'use strict'

let update = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = () => res.status(204).send()
        
        let planningId = req.params.planningId
        let body = req.body
        
        if (!planningId || !body)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.findByIdAndUpdate(planningId, body)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = update