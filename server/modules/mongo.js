const mongo = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'outstagram'

const getConn = () => {   
    return function(callback){
        mongo.MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            callback(err, db, mongo)
            

            //db클로즈언제하지
        });
    }
}

module.exports = getConn