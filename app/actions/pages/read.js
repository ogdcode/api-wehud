'use strict'

let read = app => {
    let errs = app.errors
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = page => {
            if (!page)
                res.status(404).json({ error: errs.ERR_NOTFOUND })
            else
                res.status(200).json(page)
        }
        
        let pageId = req.params.pageId
        
        if (!pageId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Page.findById(pageId)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = read