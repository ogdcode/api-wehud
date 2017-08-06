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
        posts: {
            type: Array,
            default: []
        }
    })
    
    pageSchema.plugin(require('mongoose-timestamp'))
    let page = app.mongoose.model('page', pageSchema)
    
    return page
}

module.exports = pageModel