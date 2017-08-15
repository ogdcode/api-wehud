'use strict'

let del = app => {
    let errs = app.errors
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = () => {
            let currentUser = req.session.user
            currentUser.pages.pull(pageId)
            currentUser.save()
            res.status(204).send()
        }
        
        let pageId = req.params.pageId
        if (!pageId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Page.findByIdAndRemove(pageId)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = del