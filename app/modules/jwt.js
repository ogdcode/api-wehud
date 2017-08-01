'use strict';

var jwt = require('jsonwebtoken');

function generateToken(app, obj) {      
    return jwt.sign({ _id: obj }, app.config.jwt.secret);
}

function verifyToken(app, token) {
    return jwt.verify(token, app.config.jwt.secret);
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;