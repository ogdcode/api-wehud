'use strict'

const Q = require('q')

let posts = app => {
    let errs = app.errors
    let Page = app.models.page
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
        let pageId = req.params.pageId
        if (!pageId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = Page.findById(pageId)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(page => {
            let promises = []
            if (page.users.length > 0) {
                page.users.forEach(userId => {
                    let query = Post.find({ 'publisher._id': userId })
                    let promise = query.exec()
                    promises.push(promise)
                })
            }
            
            if (page.games.length > 0) {
                page.games.forEach(gameId => {
                    let query = Post.find({ 'game._id': gameId })
                    let promise = query.exec()
                    promises.push(promise)
                })
            }
            
            if (promises.length > 0) {
                Q.all(promises).catch(EXCEPTION).done(values => {
                    values = app.modules.utils.flatten(values)
                    values.forEach(value => {
                        page.posts.push(value)
                    })

                    return res.status(200).json({ 
                        _id: page._id, 
                        posts: page.posts 
                    })
                })
            } else return res.status(200).json({ _id: page._id, posts: [] })
        })
    }
    
    return task
}

module.exports = posts