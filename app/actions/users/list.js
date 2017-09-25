'use strict'

let list = app => {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const EXCEPTION = () => { return res.status(500).json({ error: errs.ERR_SERVER }) }
        const RESPONSE = users => { return res.status(200).json(users) }
        
        let query = User.find()
        let promise = query.exec()

        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = list