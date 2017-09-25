'use strict'

const NODEMAILER = require('nodemailer')

function getTransport(app) {
    let admin = app.config.admin
    
    let transporter = NODEMAILER.createTransport({
        host: admin.smtp,
        port: admin.port,
        secure: admin.ssl,
        auth: {
            user: admin.user,
            pass: admin.pass
        }
    })
    
    return transporter
}

function generateEmail(app, recipient) {
    let admin = app.config.admin
    let modules = app.modules
    let utils = modules.utils
    let encryption = modules.encryption
    
    let randPass = utils.generatePassword(admin.len)
    let email = {
        from: admin.user,
        to: recipient.email,
        subject: 'Password reminder',
        text: 'Hello, ' + recipient.username + '. We have been informed that you have lost your password. However, do not fret! We understand that these things happen, and for this reason we decided to create a brand new password for you to use! Here it is: ' + randPass,
        html: '<b>Hello, <strong>' + recipient.username + '</strong>.</b><p>We have been informed that you have lost your password. However, do not fret! We understand that these things happen, and for this reason we decided to create a brand new password for you to use! Here it is: ' + randPass + '</p>'
    }
    
    recipient.password = encryption.encrypt(app, randPass)
    recipient.save()
    
    return email
}

module.exports.getTransport = getTransport
module.exports.generateEmail = generateEmail