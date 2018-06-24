const mongo = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'outstagram'

const connPromise = (callback) => {
    mongo.MongoClient.connect(url, (err, client) => {
        if(err){
            callback(err, null, null)
        } else {
            const db = client.db(dbName);
            callback(null, db, mongo)
        }
    })
}

module.exports = connPromise