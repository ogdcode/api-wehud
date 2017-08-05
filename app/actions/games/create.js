'use strict'

const HTTP = require('node-rest-client').Client
const KEY = 'QCrOQyWAwpmshonPiaT0GIwwI4ivp1iUkW4jsn39byWge6OqTd'

const BASEURL = 'https://igdbcom-internet-game-database-v1.p.mashape.com'
const GAMES = BASEURL + '/games'
const DEVELOPERS = BASEURL + '/companies'
//const FRANCHISES = BASEURL + '/franchises'

let create = function(app) {
    let errs = app.errors
    let Game = app.models.game
    
    var http = new HTTP()
        
    let request = function(req, res) {
        let args = {
            parameters: { fields: 'name,developers' },
            headers: { 'X-Mashape-Key': KEY }
        }
        
        http.get(GAMES + '/', args, (data, body) => {
            data.forEach(game => {
                let hasDevs = false
                let hasFranchises = false
                
                let newGame = new Game()
                newGame.name = game.name
                                
                if (game.hasOwnProperty('storyline'))
                    newGame.synopsis = game.storyline
                
                if (game.hasOwnProperty('developers')) hasDevs = true
                
                //if (game.hasOwnProperty('franchises')) hasFranchises = true
                
                if (hasDevs) {
                    game.developers.forEach(developer => {
                        
                        let args = {
                            parameters: { fields: 'name' },
                            path: { 'dId': developer },
                            headers: { 'X-Mashape-Key': KEY }
                        }
                        
                        newGame.developers = []
                        http.get(DEVELOPERS + '/${dId}/', args, (data, body) => {
                            data.forEach(dev => {
                                if (!newGame.developers.includes(dev.name)) {
                                    newGame.developers.push(dev.name)
                                    newGame.save()
                                }
                            })
                        })
                    })
                }
                
                if (!hasDevs) newGame.save()
            })
        })
    }
    
    return request
}

module.exports = create