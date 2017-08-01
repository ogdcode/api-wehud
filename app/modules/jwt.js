'use strict';

var jwt = require('jsonwebtoken');

function generateToken(app, obj) {
    let options = {
        algorithm: app.config.jwt.algorithm,
        expiresIn: app.config.jwt.expiresIn
    };
    
    return jwt.sign(obj, app.config.token.secret, options);
}

function verifyToken(app, token) {
    let options = {
        algorithm: app.config.jwt.algorithm,
        expiresIn: app.config.jwt.expiresIn
    };
    
    return jwt.verify(token, app.config.jwt.secret, options);
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;