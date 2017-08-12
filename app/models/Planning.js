'use strict'

let planningModel = app => {
    let schema = app.mongoose.Schema
    
    let planningSchema = schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        creator: {
            type: Object,
            ref: 'user',
            required: true
        },
        events: {
            type: Array,
            default: []
        }
    }, { timestamps: true })
    
    let planning = app.mongoose.model('planning', planningSchema)    
    return planning
}

module.exports = planningModel