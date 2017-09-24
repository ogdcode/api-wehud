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
                    let prom = Q.all(promises)
                    proms.push(prom)
                }
            })
            
            if (proms.length > 0) {
                Q.all(proms).then(values => {
                    let pageList = []
                    values.forEach(value => {
                        let found = false
                        pages.forEach(page => {
                            let hasUsersOrGames = page.users.length > 0 || page.games.length > 0
                            if (hasUsersOrGames && page.posts.length === 0 && !found) {
                                page.posts = app.modules.utils.flatten(value)
                                found = true
                                pageList.push(page)
                            }
                        })
                    })

                    res.status(200).json(pageList)
                })
            } else res.status(200).json(pages)
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = list