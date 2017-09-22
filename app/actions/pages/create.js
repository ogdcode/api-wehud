'use strict'

let create = app => {
    let errs = app.errors
    let Page = app.models.page
    
    let task = (req, res) => {
        const EXCEPTION = () => res.status(500).json({ error: errs.ERR_SERVER })
        const RESPONSE = page => {
            let reward = {}
            if (currentUser.score < 60) {
                currentUser.score += 1
                if (currentUser.score >= 60) reward = app.modules.utils.getReward(60, 2)
            }
            else if (currentUser.score >= 60 && currentUser.score < 160) {
                currentUser.score += 2
                if (currentUser.score >= 160) reward = app.modules.utils.getReward(160, 3)
            }
            else if (currentUser.score >= 160 && currentUser.score < 460) {
                currentUser.score += 3
                if (currentUser.score >= 460) reward = app.modules.utils.getReward(460, 4)
            }
            else if (currentUser.score >= 460 && currentUser.score < 860) {
                currentUser.score += 4
                if (currentUser.score >= 860) reward = app.modules.utils.getReward(860, 5)
            }
            else currentUser.score += 5
            currentUser.save()
            
            res.status(201).json({ _id: page._id, title: page.title, reward: reward })
        }
        
        let currentUser = req.session.user
        let body = req.body
        
        if (!currentUser || !body || !body.title)
            return res.status(400).json({ error: errs.ERR_BADREQUEST })
        
        body.owner = {
            _id: currentUser._id,
            username: currentUser.username
        }
        
        let page = new Page(body)
        let promise = page.save()
        
        promise.catch(EXCEPTION).done(RESPONSE)
    }
    
    return task
}

module.exports = create