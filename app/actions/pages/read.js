'use strict'

const Q = require('q')

let read = app => {
    let errs = app.errors
    let Page = app.models.page
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = page => {
            if (!page)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
                        
            let promises = []
            if (page.users.length > 0) {
                page.users.forEach(userId => {
                    let uId = userId.toString()
                    let query = Post.find({ 'publisher._id': uId })
                    let promise = query.exec()
                    promises.push(promise)
                })
            }
            
            if (page.games.length > 0) {
                page.games.forEach(gameId => {
                    let gId = gameId.toString()
                    let query = Post.find({ 'game._id': gId })
                    let promise = query.exec()
                    promises.push(promise)
                })
            }
            
            if (promises.length > 0)
                Q.all(promises).spread(posts => {
                    page.posts = posts
                    page.save()
                    
                    return res.status(200).json(page)
                }).catch(EXCEPTION).done()
            else return res.status(200).json(page)
        }
        
        let pageId = req.params.pageId
                
        if (!pageId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Page.findById(pageId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = read