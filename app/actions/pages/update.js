'use strict'

let update = app => {
    let errs = app.errors
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = () => { return res.status(204).send() }
        
        let body = req.body
        let pageId = req.params.pageId
        
        if (!body || !pageId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Page.findByIdAndUpdate(pageId, body)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = update