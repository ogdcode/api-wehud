'use strict'

let update = app => {
    let errs = app.errors
    let User = app.models.user
    let Game = app.models.game
    let Post = app.models.post
    let Page = app.models.page
    let Planning = app.models.planning
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
        let body = req.body
        let userId = req.session.user._id
        
        if (!body)
            return res.status(400).json({ error: errs.ERR_SERVER })
        
        if (body.password)
            body.password = app.modules.encryption.encrypt(app, body.password)
        
        let query = User.findByIdAndUpdate(userId, body)
        let promise = query.exec()
        
        promise.then(() => {
            if (body.username || body.email || body.avatar) {
                
                let query = User.find()
                let promise = query.exec()
                                
                promise.then(users => {
                    users.forEach(user => {
                        user.followers.forEach(u => {
                            if (u._id.equals(userId)) {
                                user.followers.pull(u)
                                let newUser = {
                                    _id: u._id,
                                    username: body.username,
                                    email: body.email,
                                    avatar: body.avatar
                                }
                                user.followers.push(newUser)
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
                                let newUser = {
                                    _id: user._id,
                                    username: body.username,
                                    email: body.email
                                }
                                game.followers.push(newUser)
                                game.save()
                            }
                        })
                    })
                })
                
                let query3 = Post.find()
                let promise3 = query3.exec()

                promise3.then(posts => {
                    posts.forEach(post => {
                        if (post.publisher._id.equals(userId)) {
                            let newPublisher = {
                                _id: userId,
                                username: body.username,
                                avatar: body.avatar
                            }
                            post.publisher = newPublisher
                        }

                        if (post.receiver && post.receiver._id.equals(userId)) {
                            let newReceiver = {
                                _id: userId,
                                username: body.username
                            }
                            post.receiver = newReceiver
                        }

                        post.save()
                    })
                })
                
                let query4 = Page.find()
                let promise4 = query4.exec()

                promise4.then(pages => {
                    pages.forEach(page => {
                        if (page.owner._id.equals(userId)) {
                            let newOwner = {
                                _id: userId,
                                username: body.username
                            }
                            page.owner = newOwner
                        }

                        if (page.users) {
                            page.users.forEach(user => {
                                if (user._id.equals(userId)) {
                                    let newUser = {
                                        _id: userId,
                                        username: body.username
                                    }
                                    page.users.pull(user)
                                    page.users.push(newUser)
                                }
                            })
                        }

                        page.save()
                    })
                })
                
                let query5 = Planning.find()
                let promise5 = query5.exec()

                promise5.then(plannings => {
                    plannings.forEach(planning => {
                        if (planning.creator._id.equals(userId)) {
                            let newCreator = {
                                _id: userId,
                                username: body.username
                            }

                            planning.creator = newCreator
                            planning.save()
                        }
                    })
                })
                
                let query6 = Event.find()
                let promise6 = query6.exec()
                
                promise6.then(events => {
                    plannings.forEach(event => {
                        if (event.creator._id.equals(userId)) {
                            let newCreator = {
                                _id: userId,
                                username: body.username
                            }

                            event.creator = newCreator
                            event.save()
                        }
                    })
                })
            }
            
            return res.status(204).send()
            
        }).catch(EXCEPTION)
    }
    return task
}

module.exports = update