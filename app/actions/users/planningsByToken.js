'use strict'

let plannings = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = plannings => {
            let results = []
            plannings.forEach(planning => {
                if (planning.creator._id.equals(userId))
                    results.push(planning)
            })
            
            res.status(200).json(results)
        }
        
        let userId = req.session.user._id
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.find()
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = plannings