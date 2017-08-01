'use strict';

var crypto = require('crypto');

function encrypt(app, text) {
    console.log('Encrypting ' + text);
    var cipher = crypto.createCipher('aes-256-cbc', app.config.encKey);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(app, text) {
    console.log('Decrypting ' + text);
    var decipher = crypto.createDecipher('aes-256-cbc', app.config.encKey);
    var deciphered = decipher.update(text, 'hex', 'utf8');
    deciphered += decipher.final('utf8');
    return deciphered;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;