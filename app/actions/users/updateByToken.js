'use strict'

let update = app => {
    let errs = app.errors
    let User = app.models.user
    let Game = app.models.game
    let Post = app.models.post
    let Page = app.models.page
    let Planning = app.models.planning
    let Event = app.models.event
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const EXCEPTION_U = () => { return res.status(500).json({ code: 'EXCEPTION_U', error: errs.ERR_SERVER }) }
        const EXCEPTION_G = () => { return res.status(500).json({ code: 'EXCEPTION_G', error: errs.ERR_SERVER }) }
        const EXCEPTION_PO = () => { return res.status(500).json({ code: 'EXCEPTION_PO', error: errs.ERR_SERVER }) }
        const EXCEPTION_PA = () => { return res.status(500).json({ code: 'EXCEPTION_PA', error: errs.ERR_SERVER }) }
        const EXCEPTION_PL = () => { return res.status(500).json({ code: 'EXCEPTION_PL', error: errs.ERR_SERVER }) }
        const EXCEPTION_E = () => { return res.status(500).json({ code: 'EXCEPTION_E', error: errs.ERR_SERVER }) }
        
        let body = req.body
        let userId = req.session.user._id.toString()
        
        if (!body)
            return res.status(400).json({ error: errs.ERR_SERVER })
        
        if (body.password)
            body.password = app.modules.encryption.encrypt(app, body.password)
        
        let query = User.findByIdAndUpdate(userId, body, { new: true })
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(user => {
            
            let usersQuery = User.find()
            let usersPromise = usersQuery.exec()
            usersPromise.then(users => {
                users.forEach(u => {
                    u.followers.forEach(follower => {
                        if (follower._id == userId) {
                            let newFollower = {
                                _id: userId,
                                username: user.username,
                                email: user.email,
                                avatar: user.avatar
                            }
                            u.followers.pull(follower)
                            u.followers.push(newFollower)
                            u.save()
                        }
                    })
                })
            }).catch(EXCEPTION_U)
                        
            let gamesQuery = Game.find()
            let gamesPromise = gamesQuery.exec()
            gamesPromise.then(games => {
                games.forEach(game => {
                    game.followers.forEach(follower => {
                        if (follower._id == userId) {
                            let newFollower = {
                                _id: userId,
                                username: user.username,
                                email: user.email
                            }
                            game.followers.pull(follower)
                            game.followers.push(newFollower)
                            game.save()
                        }
                    })
                })
            }).catch(EXCEPTION_G)
                        
            let postsQuery = Post.find()
            let postsPromise = postsQuery.exec()
            postsPromise.then(posts => {
                posts.forEach(post => {
                    if (post.publisher._id == userId) {
                        let newPublisher = {
                            _id: userId,
                            avatar: user.avatar,
                            username: user.username
                        }
                        post.publisher = newPublisher
                    }
                    
                    if (post.receiver && post.receiver._id == userId) {
                        let newReceiver = {
                            _id: userId,
                            username: user.username
                        }
                        post.receiver = newReceiver
                    }
                    
                    post.save()
                })
            }).catch(EXCEPTION_PO)
                        
            let pagesQuery = Page.find()
            let pagesPromise = pagesQuery.exec()
            pagesPromise.then(pages => {
                pages.forEach(page => {
                    if (page.owner._id == userId) {
                        let newOwner = {
                            _id: userId,
                            username: user.username
                        }
                        page.owner = newOwner
                    }
                    
                    if (page.users.length > 0) {
                        page.users.forEach(u => {
                            if (u._id == userId) {
                                let newUser = {
                                    _id: userId,
                                    username: user.username
                                }
                                page.users.pull(u)
                                page.users.push(newUser)
                            }
                        })
                    }
                    
                    page.save()
                })
            }).catch(EXCEPTION_PA)
                        
            let planningQuery = Planning.find()
            let planningPromise = planningQuery.exec()
            planningPromise.then(plannings => {
                plannings.forEach(planning => {
                    if (planning.creator._id == userId) {
                        let newCreator = {
                            _id: userId,
                            username: user.username
                        }
                        
                        planning.creator = newCreator
                        planning.save()
                    }
                })
            }).catch(EXCEPTION_PL)
                        
            let eventsQuery = Event.find()
            let eventsPromise = eventsQuery.exec()
            eventsPromise.then(events => {
                events.forEach(event => {
                    if (event.creator._id == userId) {
                        let newCreator = {
                            _id: userId,
                            username: user.username
                        }
                        
                        event.creator = newCreator
                        event.save()
                    }
                })
            }).catch(EXCEPTION_E)
            
            return res.status(204).send()
        })
    }
    return task
}

module.exports = update