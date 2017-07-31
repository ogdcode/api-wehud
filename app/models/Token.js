'use strict';

var tokenModel = function(app) {
    var schema = app.mongoose.Schema;
    
    var tokenSchema = schema({
        value: {
            type: String,
            required: true
        },
        userId: {
            type: schema.Types.ObjectId,
            required: true
        },
        expiresIn: {
            type: Number,
            required: true
        }
    });
    
    tokenSchema.plugin(require('mongoose-timestamp'));
    var token = app.mongoose.model('token', tokenSchema);
    
    return token;
};

module.exports = tokenModel;