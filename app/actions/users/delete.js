'use strict'

let del = app => {
    let errs = app.errors
    let User = app.models.user
    let Game = app.models.game
    let Post = app.models.post
    let Page = app.models.page
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let userId = req.params.userId
        
        if (!userId)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let query = User.findById(userId)
        let promise = query.exec()
        
        promise.then(currentUser => {
            let query = User.find()
            let promise = query.exec()

            promise.then(users => {
                users.forEach(user => {
                    let followers = user.followers
                    followers.forEach(u => {
                        if (u._id.equals(userId)) {
                            user.followers.pull(u)
                            user.save().catch(EXCEPTION)
                        }
                    })
                })

                let query = Game.find()
                let promise = query.exec()

                promise.then(games => {
                    games.forEach(game => {
                        game.followers.forEach(user => {
                            if (user._id.equals(userId)) {
                                game.followers.pull(user)
                                game.save().catch(EXCEPTION)
                            }
                        })
                    })

                    let query = Post.find()
                    let promise = query.exec()

                    promise.then(posts => {
                        posts.forEach(post => {
                            if (post.publisher._id.equals(userId))
                                post.remove().catch(EXCEPTION)
                            else {
                                if (post.receiver && post.receiver._id.equals(userId)) 
                                    post.receiver = null

                                post.save().catch(EXCEPTION)
                            }
                        })

                        let query = Page.find()
                        let promise = query.exec()

                        promise.then(pages => {
                            pages.forEach(page => {
                                if (page.owner._id.equals(userId))
                                    page.remove().catch(EXCEPTION)
                                else {
                                    if (page.users) {
                                        page.users.forEach(user => {
                                            if (user._id.equals(userId))
                                                page.users.pull(user)
                                        })
                                    }

                                    page.save().catch(EXCEPTION)
                                }
                            })

                            let query = Planning.find()
                            let promise = query.exec()

                            promise.then(plannings => {
                                plannings.forEach(planning => {
                                    if (planning.creator._id.equals(userId))
                                        planning.remove().catch(EXCEPTION)
                                })

                                currentUser.remove().catch(EXCEPTION)

                                res.status(204).send()

                            }).catch(EXCEPTION)
                        }).catch(EXCEPTION)
                    }).catch(EXCEPTION)
                }).catch(EXCEPTION)
            }).catch(EXCEPTION)
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = del