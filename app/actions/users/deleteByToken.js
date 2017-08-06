'use strict'

let del = function(app) {
    let errs = app.errors
    let User = app.models.user
    
    let task = (req, res) => {
        const RESPONSE = () => res.status(204).send()
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        
        let currentUser = req.session.user
        
        let query = User.findByIdAndRemove(currentUser._id)
        let promise = query.exec()
        
        promise.then(RESPONSE).catch(EXCEPTION)
    };
    
    return task
};

module.exports = del