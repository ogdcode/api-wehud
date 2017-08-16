'use strict'

const Q = require('q')

let list = app => {
    let errs = app.errors
    let Page = app.models.page
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let query = Page.find()
        let promise = query.exec()
        
        promise.then(pages => {
            let proms = []
            pages.forEach(page => {
                if (page.users.length > 0) {
                    let promises = []
                    page.users.forEach(userId => {
                        let query = Post.find({ 'publisher._id': userId })
                        let promise = query.exec()
                        promises.push(promise)
                    })
                    
                    let prom = Q.all(promises)
                    proms.push(prom)
                }
            })
            
            Q.all(proms).spread(results => {
                results.forEach(result => {
                    let found = false
                    pages.forEach(page => {
                        if (page.users.length > 0 && page.posts.length == 0 && !found) {
                            page.posts = result
                            found = true
                        }
                    })
                })
                
                res.status(200).json(pages)
            })
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = list