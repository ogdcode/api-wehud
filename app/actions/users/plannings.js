'use strict'

let plannings = app => {
    let errs = app.errors
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = plannings => {
            let results = []
            plannings.forEach(planning => {
                if (planning.creator._id == userId)
                    results.push(planning)
            })
            
            return res.status(200).json(results)
        }
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Planning.find()
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = plannings