'use strict';

var express = require('express');
var app = express();

(function init() {
    require('./settings')(app);
    require('./modules')(app);
    require('./models')(app);
    //require('./middlewares')(app);
    require('./actions')(app);
    require('./routes')(app);
}());

(function start() {
    let port = app.config.port;
    let dbname = app.config.db.name;
    let dbuser = app.config.db.user;

    console.log('Connecting to ' + dbname + ' as ' + dbuser);
    app.listen(port, '0.0.0.0');
}());