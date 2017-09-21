'use strict'

const NODEMAILER = require('nodemailer')

function getTransport(app) {
    let transporter = NODEMAILER.createTransport({
        host: app.config.admin.smtp,
        port: app.config.admin.port,
        secure: app.config.admin.ssl,
        auth: {
            user: app.config.admin.user,
            pass: app.config.admin.pass
        }
    })
    
    return transporter
}

function generateEmail(app, recipient) {    
    let randPass = app.modules.utils.generatePassword(12)
    let email = {
        from: app.config.admin.user,
        to: recipient.email,
        subject: 'Password reminder',
        text: 'Hello, ' + recipient.username + '.We have been informed that you have lost your password. However, do not fret! We understand that these things happen, and for this reason we decided to create a brand new password for you to use! Here it is: ' + randPass,
        html: '<b>Hello, <strong>' + recipient.username + '</strong>.</b><p>We have been informed that you have lost your password. However, do not fret! We understand that these things happen, and for this reason we decided to create a brand new password for you to use! Here it is: ' + randPass + '</p>'
    }
    
    recipient.password = app.modules.encryption.encrypt(app, randPass)
    recipient.save()
    
    return email
}

module.exports.getTransport = getTransport
module.exports.generateEmail = generateEmail