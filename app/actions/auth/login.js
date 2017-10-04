'use strict'

let login = app => {
    let config = app.config
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = foundUser => {
            if (!foundUser)
                return res.status(404).json({ error: errs.ERR_NOTFOUND })
            
            if (foundUser.password !== options.password)
                return res.status(403).json({ error: errs.ERR_INVALIDCREDS })
            
            foundUser.connected = true
            foundUser.save()

            let token = app.modules.jwt.generateToken(app, foundUser._id)
            foundUser.token = token
            
            let f = {
                _id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
                avatar: foundUser.avatar,
                connected: true
            }
            
            let query = User.find()
            let promise = query.exec()
            promise.catch(EXCEPTION).done(users => {
                let uId = foundUser._id.toString()
                users.forEach(user => {
                    user.followers.forEach(follower => {
                        let fId = follower._id.toString()
                        if (fId === uId) {
                            user.followers.pull(follower)
                            if (user.followers.indexOf(f) < 0) user.followers.push(f)
                        }
                        user.save()
                    })
                })
            })

            return res.status(200).json({ _id: foundUser._id, token: token })
        }
        
        let body = req.body
        
        if (!body || !body.usernameOrEmail || !body.password)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        let options = {}
        if (body.usernameOrEmail.indexOf('@') !== -1) options.email = body.usernameOrEmail
        else options.username = body.usernameOrEmail
        
        options.password = app.modules.encryption.encrypt(app, body.password)
        
        let query = User.findOne(options)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    };
    
    return task
};

module.exports = login