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
    while (arr.length > 0) result = result.concat(arr.splice(rand(arr.length - 1)))
    
    return result
}

function flatten(arr) {
    let ret = []
    for(let i = 0; i < arr.length; ++i) {
        if(Array.isArray(arr[i])) ret = ret.concat(flatten(arr[i]))
        else ret.push(arr[i])
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
    for(let key in map) return !map.hasOwnProperty(key)
    
   return true
}

function updateScore(score, thresholds, action, entities, points, mode) {
    let threshold = 0
    let i = 0
    while (i < thresholds.length && thresholds[i] <= score) threshold = thresholds[i++]
    score += points[i]
    
    switch (mode) {
        case 0:
            let oldThreshold = threshold
            while (i < thresholds.length && thresholds[i] <= score) threshold = thresholds[i++]
            if (oldThreshold === threshold) return { score: { total: score }, reward: {} }
            
            return { score: { total: score }, 
                     reward: { 
                        score: threshold, 
                        action: action, 
                        entities: entities, 
                        points: points[i]
                     }
                   }
        case 1:
            return { score: -score }
        default:
            break
    }
}

module.exports = {
    flatten: flatten,
    generatePassword: generatePassword,
    isEmpty: isEmpty,
    updateScore: updateScore
}