'use strict'

let del = app => {
    let errs = app.errors
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = () => {
            let currentUser = req.session.user
            let entity = app.config.entity
            let updated = app.modules.utils.updateScore(currentUser.score,
                                                        entity.thresholds.pages,
                                                        entity.actions.pages[0],
                                                        [entity.name.pages],
                                                        entity.points.pages, 1)
            currentUser.score = updated.score
            currentUser.save()
            
            return res.status(204).send()
        }
        
        let pageId = req.params.pageId
        if (!pageId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Page.findByIdAndRemove(pageId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = del