'use strict'

let create = app => {
    let errs = app.errors
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = page => {
            
            let entity = app.config.entity
            let updated = app.modules.utils.updateScore(currentUser.score,
                                                        entity.thresholds.pages,
                                                        entity.actions.pages[0],
                                                        [entity.name.pages],
                                                        entity.points.pages, 0)
            currentUser.score = updated.score.total
            currentUser.save()
            
            return res.status(201).json({ 
                _id: page._id, 
                title: page.title, 
                reward: updated.reward 
            })
        }
        
        let currentUser = req.session.user
        let body = req.body
        
        if (!currentUser || !body || !body.title)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        body.owner = {
            _id: currentUser._id,
            username: currentUser.username
        }
        
        let page = new Page(body)
        let promise = page.save()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = create