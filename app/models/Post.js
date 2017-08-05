'use strict';

let postModel = function(app) {
    var schema = app.mongoose.Schema;
    let postSchema = schema({
        publisher: {
            type: Object,
            ref: 'user',
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
        text: {
            type: String,
            required: true
        },
        opinion: {
            type: Boolean,
            required: true,
            default: false
        },
        message: {
            type: Boolean,
            required: true,
            default: false
        },
        rating: {
            type: Number
        },
        videoUri: {
            type: String
        }
    });
    
    postSchema.plugin(require('mongoose-timestamp'));
    let post = app.mongoose.model('post', postSchema);
    
    return post;
};

module.exports = postModel;