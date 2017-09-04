'use strict'

let eventModel = app => {
    let schema = app.mongoose.Schema
    
    let eventSchema = schema({
        creator: {
            type: Object,
            ref: 'user',
            required: true
        },
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
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: + new Date() + 24 * 60 * 60 * 1000 // The following day, in ms
        },
        tag: {
            type: Number,
            default: 0
        },
        planning: {
            type: String,
            default: ""
        }
    }, { timestamps: true })
    
    let event = app.mongoose.model('event', eventSchema)
    return event
}

module.exports = eventModel