'use strict'

let action = app => {
    let User = app.models.user
    let errs = app.errors
    let modules = app.modules
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        
        let body = req.body
        if (!body || !body.usernameOrEmail)
            return res.status(403).json({ error: errs.ERR_UNAUTHORIZED })
        
        let options = {}
        if (body.usernameOrEmail.indexOf('@') !== -1) options.email = body.usernameOrEmail
        else options.username = body.usernameOrEmail
        
        let query = User.findOne(options)
        let promise = query.exec()
        
        promise.catch(EXCEPTION).done(user => {
            let transporter = modules.emailer.getTransport(app)
            
            if (!transporter)
                return res.status(500).json({ error: errs.ERR_SERVER })
            
            let email = modules.emailer.generateEmail(app, user)
            
            transporter.sendMail(email, (error, response) => {
                if (error) {
                    transporter.close()
                    return res.status(500).json({ error: errs.ERR_SERVER })
                }
                
                transporter.close()
                return res.status(200).json({ response: response })             
            })
        })
    }
    
    return task
}

module.exports = action