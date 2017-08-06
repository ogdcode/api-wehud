'use strict'

const JWT = require('jsonwebtoken')

function generateToken(app, obj) {
    let payload = { _id: obj }
    let options = { expiresIn: app.config.jwt.expiresIn }
    return JWT.sign(payload, app.config.jwt.secret, options)
}

function verifyToken(app, token) {
    return JWT.verify(token, app.config.jwt.secret)
}

module.exports.generateToken = generateToken
module.exports.verifyToken = verifyToken