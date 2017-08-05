'use strict';

var userModel = function(app) {
    var schema = app.mongoose.Schema;
    
    var userSchema = schema({
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
            required: true,
            //select: false
        },
        connected: {
            type: Boolean,
            required: true,
            default: false
        },
        followers: {
            type: [Object],
            ref: 'User',
            default: []
        },
        score: {
            type: Number,
            required: true,
            default: 0
        }
    });
    
    userSchema.methods.isConnected = function() {
        return this.connected;
    };
    
    userSchema.methods.follow = function(user) {
        this.followers.push(user);
    };
    
    userSchema.methods.unfollow = function(user) {
        this.followers.pull(user);
    }
    
    userSchema.plugin(require('mongoose-timestamp'));
    let user = app.mongoose.model('user', userSchema);
    
    return user;
};

module.exports = userModel;