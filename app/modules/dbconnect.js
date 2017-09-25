'use strict'

let initialize = app => {
    let db = app.config.db
    
    let map = {
        '<user>': db.user,
        '<pass>': db.pass,
        '<name>': db.name
    }
        
    return replaceMultiple(db.path, map);
};

function replaceMultiple(str, map) {
    let regex = new RegExp(Object.keys(map).join('|'), 'gi')
    
    return str.replace(regex, matched => {
        return map[matched]
    })
}

module.exports = initialize