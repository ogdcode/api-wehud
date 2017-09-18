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

module.exports.flatten = flatten
module.exports.generatePassword = generatePassword