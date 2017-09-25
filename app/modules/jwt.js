'use strict'

const JWT = require('jsonwebtoken')

function generateToken(app, obj) {
    let payload = { _id: obj }
    let options = { expiresIn: app.config.jwt.expiresIn }
    return JWT.sign(payload, app.config.jwt.secret, options)
}

function verifyToken(app, token) {
    let result = ""
    try {
        result = JWT.verify(token, app.config.jwt.secret)
    } catch(err) {
        result = app.errors.ERR_UNAUTHORIZED
    }
    
    return result
}
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
}