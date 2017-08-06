'use strict'

let initialize = app => {
    let config = app.config
    
    let map = {
        '<user>': config.db.user,
        '<pass>': config.db.pass,
        '<name>': config.db.name
    }
    
    let path = config.db.path
    
    return replaceMultiple(path, map);
};

function replaceMultiple(str, map) {
    let regex = new RegExp(Object.keys(map).join('|'), 'gi')
    
    return str.replace(regex, matched => {
        return map[matched]
    })
}

module.exports = initialize