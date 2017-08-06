'use strict'

let update = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let body = req.body
        let userId = req.session.user._id
        
        if (!body)
            return res.status(400).json({ error: errs.ERR_SERVER })
        
        if (body.password)
            body.password = app.modules.encryption.encrypt(app, body.password)
        
        let query = User.findByIdAndUpdate(userId, body)
        let promise = query.exec()
        
        promise.then(currentUser => {
            if (body.username || body.email) {
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
                                   email: body.email
                               }
                               user.followers.push(newUser)
                               user.save()
                           }
                       })
                   })
                   
                   let query = Post.find()
                   let promise = query.exec()

                   promise.then(posts => {
                       posts.forEach(post => {
                           if (post.publisher._id.equals(userId)) {
                               let newPublisher = {
                                   _id: userId,
                                   username: body.username
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

                       // TODO: Add similar checks for Page and Planning
                       // Page: owner, users
                       // Planning: creator

                       res.status(204).send()
                   })
               }).catch(EXCEPTION)
            } else
               res.status(204).send()
        }).catch(EXCEPTION)
    }
    return task
}

module.exports = update