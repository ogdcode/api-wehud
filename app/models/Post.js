'use strict'

let postModel = app => {
    let schema = app.mongoose.Schema
    
    let postSchema = schema({
        publisher: {
            type: Object,
            ref: 'user',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        game: {
            type: Object,
            ref: 'game'
        },
        receiver: {
            type: Object,
            ref: 'user'
        },
        opinion: {
            type: Boolean,
            default: false
        },
        message: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number
        },
        videoUri: {
            type: String
        }
    })
    
    postSchema.plugin(require('mongoose-timestamp'))
    let post = app.mongoose.model('post', postSchema)
    
    return post
}

module.exports = postModel