const mongoose = require('mongoose');
require('dotenv').config();

let connectionPromise = null

const mongoDBConfig=()=>{
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve(mongoose.connection)
    }

    if (connectionPromise) {
        return connectionPromise
    }

    connectionPromise = mongoose
        .connect(`${process.env.MONGODB_URI}`)
        .then(() => {
            console.log('Connected')
            return mongoose.connection
        })
        .catch((error) => {
            connectionPromise = null
            console.error('MongoDB connection failed:', error.message)
            throw error
        })

    return connectionPromise
}

module.exports=mongoDBConfig