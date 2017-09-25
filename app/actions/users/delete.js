'use strict'

let del = app => {
    let errs = app.errors
    let User = app.models.user
    let Game = app.models.game
    let Post = app.models.post
    let Page = app.models.page
    let Planning = app.models.planning
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
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
                            user.save()
                        }
                    })
                })
            })
            
            let query2 = Game.find()
            let promise2 = query2.exec()

            promise2.then(games => {
                games.forEach(game => {
                    game.followers.forEach(user => {
                        if (user._id.equals(userId)) {
                            game.followers.pull(user)
                            game.save()
                        }
                    })
                })
            })
            
            let query3 = Post.find()
            let promise3 = query3.exec()

            promise3.then(posts => {
                posts.forEach(post => {
                    if (post.publisher._id.equals(userId))
                        post.remove().catch(EXCEPTION)
                    else {
                        if (post.receiver && post.receiver._id.equals(userId)) 
                            post.receiver = null

                        post.save()
                    }
                })
            })
            
            let query4 = Page.find()
            let promise4 = query4.exec()

            promise4.then(pages => {
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
            })
            
            let query5 = Planning.find()
            let promise5 = query5.exec()

            promise5.then(plannings => {
                plannings.forEach(planning => {
                    if (planning.creator._id.equals(userId))
                        planning.remove().catch(EXCEPTION)
                })

                currentUser.remove().catch(EXCEPTION)
            })
            
            let query6 = Event.find()
            let promise6 = query6.exec()
            
            promise6.then(events => {
                events.forEach(event => {
                    if (event.creator._id.equals(userId))
                        event.remove().catch(EXCEPTION)
                })

                currentUser.remove().catch(EXCEPTION)
            })
            
            return res.status(204).send()
            
        }).catch(EXCEPTION)
    }
    
    return task
}

module.exports = del