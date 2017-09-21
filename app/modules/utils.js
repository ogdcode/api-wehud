'use strict'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DIGIT = '0123456789'
const ALL = UPPER + LOWER + DIGIT

function rand(max) {
    return Math.floor(Math.random() * max)
}

function random(set) {
    return set[rand(set.length - 1)]
}

function generateArray(length, set) {
    let result = []
    while (length--) result.push(random(set))
    return result
}

function shuffle(arr) {
    let result = []
    while (arr.length) {
        result = result.concat(arr.splice(rand[arr.length - 1]))
    }
    
    return result
}

function flatten(arr) {
    let ret = []
    for(let i = 0; i < arr.length; ++i) {
        if(Array.isArray(arr[i])) {
            ret = ret.concat(flatten(arr[i]))
        } else {
            ret.push(arr[i])
        }
    }
    return ret
}

function generatePassword(length) {
    let result = []
    
    result = result.concat(generateArray(1, UPPER))
    result = result.concat(generateArray(1, LOWER))
    result = result.concat(generateArray(1, DIGIT))
    result = result.concat(generateArray(length - 3, ALL))
    
    return shuffle(result).join('')
}

function isEmpty(map) {
    for(let key in map)
      return !map.hasOwnProperty(key)
    
   return true
}

function getReward(score) {
    let action = 0
    let entities = []
    if (score === 100 || score === 200) entities.push('posts')
    if (score === 50 || score === 250 || score === 550) entities.push('plannings')
    if (score === 60 || score === 160 || score === 460 || score === 860) entities.push('pages')
    if (score === 70 || score === 370) entities.push('events')
    if (score === 375 || score === 675 || score === 975) {
        action = 1
        entities.push('events')
    }
    if (score === 400) {
        action = 2
        entities.push('a user')
        entities.push('a game')
    }
    
    if (entities.length === 0) return {}
    
    return { score: score, action: action, entities: entities }
}

module.exports.flatten = flatten
module.exports.generatePassword = generatePassword
module.exports.isEmpty = isEmpty
module.exports.getReward = getReward