'use strict'

let pageModel = app => {
    let schema = app.mongoose.Schema
    
    let pageSchema = schema({
        title: {
            type: String,
            required: true
        },
        owner: {
            type: Object,
            ref: 'user',
            required: true
        },
        users: {
            type: Array,
            default: []
        },
        posts: {
            type: Array,
            default: []
        }
    }, { timestamps: true })
    
    let page = app.mongoose.model('page', pageSchema)    
    return page
}

module.exports = pageModel