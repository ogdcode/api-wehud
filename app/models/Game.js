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
        },
        publishers: {
            type: [String],
            default: []
        },
        franchise: {
            type: String
        },
        mainGame: {
            type: String
        },
        modes: {
            type: [String],
            default: []
        },
        genres: {
            type: [String],
            default: []
        },
        firstReleaseDate: {
            type: Number,
            
        },
        isDlcOrExpansion: {
            type: Boolean,
            default: false
        },
        cover: {
            type: String
        },
        status: {
            type: Number
        }
    })
    
    gameSchema.plugin(require('mongoose-timestamp'))
    let game = app.mongoose.model('game', gameSchema)
    
    return game
}

module.exports = gameModel