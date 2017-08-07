'use strict'

let list = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = (plannings) => res.status(200).json(plannings)
        
        let query = Planning.find()
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = list