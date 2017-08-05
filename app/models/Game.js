'use strict'

let gameModel = function(app) {
    let schema = app.mongoose.Schema
    
    let gameSchema = schema({
        name: {
            type: String,
            required: true
        },
        synopsis: {
            type: String
        },
        developers: {
            type: [String],
            default: []
        }
    })
    
    gameSchema.plugin(require('mongoose-timestamp'))
    let game = app.mongoose.model('game', gameSchema)
    
    return game
}

module.exports = gameModel