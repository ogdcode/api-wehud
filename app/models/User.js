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
            type: String,
            default: 'https://s3.ca-central-1.amazonaws.com/g-zone/images/profile01.png'
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
            default: null
        }
    }, { timestamps: true })
    
    let user = app.mongoose.model('user', userSchema)    
    return user
}

module.exports = userModel