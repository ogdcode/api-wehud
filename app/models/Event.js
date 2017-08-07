'use strict'

let eventModel = app => {
    let schema = app.mongoose.Schema
    
    let eventSchema = schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Number,
            required: true,
            default: Date.now
        },
        endDate: {
            type: Number,
            required: true,
            default: Date.now + (24 * 60 * 60 * 1000) // The following day, in ms
        },
        tag: {
            type: Number,
            required: true,
            default: 0
        }
    })
    
    eventSchema.plugin(require('mongoose-timestamp'))
    let event = app.mongoose.model('event', eventSchema)
    
    return event
}

module.exports = eventModel