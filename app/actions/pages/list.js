'use strict'

const Q = require('q')

function flatten(arr) {
    var ret = [];
    for(var i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            ret = ret.concat(flatten(arr[i]));
        } else {
            ret.push(arr[i]);
        }
    }
    return ret;
}

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
                pages.forEach(page => {
                    if (page.users.length > 0 && page.posts.length == 0) {
                        page.posts = flatten(results)
                        console.log(page)
                    }
                })
                
                res.status(200).json(pages)
            })
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = list