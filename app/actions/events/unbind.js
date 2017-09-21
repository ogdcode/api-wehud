'use strict'

let unbind = app => {
    let errs = app.errors
    let Event = app.models.event
    let Planning = app.models.planning
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = planning => res.status(200).send({ planning: planning.title, events: planning.events })
        
        let eventId = req.params.eventId
        let body = req.body
        
        if (!eventId || !body || !body.planning)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Event.findById(eventId)
        let promise = query.exec()
        
        promise.then(event => {
            if (!event)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            let query = Planning.findOne({ title: body.planning })
            let promise = query.exec()
            
            promise.then(planning => {
                if (!planning)
                    return res.status(404).json({ error: errs.ERR_NOTFOUND })
                
                event.planning = ""
                event.save()
                
                planning.events.pull(event)
                let promise = planning.save()
                
                promise.catch(EXCEPTION).done(RESPONSE)
                
                let query2 = User.findById(event.creator._id)
                let promise2 = query2.exec()
                
                promise2.catch(EXCEPTION).done(creator => {
                    if (creator.score >= 375) {
                        if (creator.score >= 975) creator.score -= 6
                        else if (creator.score >= 675) creator.score -= 3
                        else creator.score -= 1
                        creator.save()
                    }
                })
            })
        })
    }
    
    return task
}

module.exports = unbind