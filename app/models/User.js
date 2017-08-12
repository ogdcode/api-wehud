'use strict'

let userModel = app => {
    let schema = app.mongoose.Schema
    
    let userSchema = schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        connected: {
            type: Boolean,
            default: false
        },
        followers: {
            type: Array,
            default: []
        },
        score: {
            type: Number,
            default: 0
        },
        token: {
            type: String,
            select: false,
            default: null
        }
    })
    
    userSchema.plugin(require('mongoose-timestamp'))
    let user = app.mongoose.model('user', userSchema)
    
    return user
}

module.exports = userModel