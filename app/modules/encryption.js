'use strict'

const CRYPTO = require('crypto')

function encrypt(app, text) {
    let crypt = app.config.crypt
    
    let cipher = CRYPTO.createCipher(crypt.alg, app.config.encKey)
    let crypted = cipher.update(text, crypt.enc1, crypt.enc2)
    crypted += cipher.final(crypt.enc2)
    
    return crypted
}

function decrypt(app, text) {
    let crypt = app.config.crypt
    
    let decipher = CRYPTO.createDecipher(crypt.alg, app.config.encKey)
    let deciphered = decipher.update(text, crypt.enc2, crypt.enc1)
    deciphered += decipher.final(crypt.enc1)
    
    return deciphered
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt