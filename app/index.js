'use strict'

// Semicolons are required here because of closures.

const EXPRESS = require('express');
let app = EXPRESS();

(function init() {
    require('./settings')(app)
    require('./modules')(app)
    require('./models')(app)
    require('./middlewares')(app)
    require('./actions')(app)
    require('./routes')(app)
}());

(function start() {
    let config = app.config
    let db = config.db

    console.log('Connecting to ' + db.name + ' as ' + db.user)
    app.listen(process.env.PORT || config.port, '0.0.0.0')
}());