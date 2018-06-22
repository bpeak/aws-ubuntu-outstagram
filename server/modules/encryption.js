const crypto = require('crypto')

const byteSize = 64

const iterations = 99999
const keySize = 64
const digest = 'sha512'

const _promiseRandomBytes = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(byteSize, (err, buf) => {
            if(err){
                reject()
            } else {
                resolve(buf.toString('base64'))
            }
        })
    })
}



const _promisePbkdf2 = (pw, salt) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(pw, salt, iterations, keySize, digest, (err, key) => {
            if(err){
                reject()
            }
            let pwSet = {
                salt,
                key : key.toString('base64')
            }
            resolve(pwSet)
        });
    })
}

const getPwSet = (pw, callback) => {
    _promiseRandomBytes()
    .then(salt => _promisePbkdf2(pw, salt))
    .then(pwSet => callback(pwSet))
}

const getKey = (pw, salt, callback) => {
    _promisePbkdf2(pw, salt)
    .then(pwSet => callback(pwSet.key))
}

const encryption = { getPwSet, getKey }

module.exports = encryption