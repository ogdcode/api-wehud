'use strict'

const Q = require('q')

let list = app => {
    let errs = app.errors
    let Page = app.models.page
    let Post = app.models.post
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = pages => {
            let saves = []
            pages.forEach(page => {
                if (page.users) {
                    let promises = []
                    page.users.forEach(userId => {
                        let query = Post.find({ 'publisher._id': userId })
                        let promise = query.exec()
                        promises.push(promise)
                    })
                    
                    Q.all(promises).spread(posts => {
                        page.posts = posts
                        saves.push(page.save())
                    }).catch(EXCEPTION).done()
                }
            })
            
            Q.all(saves).spread(pages => res.status(200).json(pages)).catch(EXCEPTION).done()
        }
        
        let query = Page.find()
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    }
    
    return task
}

module.exports = list