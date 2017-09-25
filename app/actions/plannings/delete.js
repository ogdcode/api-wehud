'use strict'

let del = app => {
    let errs = app.errors
    let Planning = app.models.planning
    let Event = app.models.event
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = planning => {
            let query = Event.find({ planning: planning.title })
            let promise = query.exec()
            
            let query2 = User.findById(planning.creator._id)
            let promise2 = query2.exec()
            
            promise.catch(EXCEPTION).done(events => {
                events.forEach(event => {
                    event.planning = ""
                    event.save()
                })
                
                planning.remove()
                
                return res.status(204).send()
            })
            
            promise2.catch(EXCEPTION).done(creator => {
                let entity = app.config.entity
                let updated = app.modules.utils.updateScore(creator.score, 
                                                            entity.thresholds.plannings,
                                                            entity.actions.plannings[0],
                                                            [entity.name.plannings],
                                                            entity.points.plannings, 1)
                creator.score = updated.score
                creator.save()
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