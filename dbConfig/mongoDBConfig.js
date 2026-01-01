const mongoose = require('mongoose');
require('dotenv').config();


const mongoDBConfig=()=>{
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.iakozvn.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`)
    .then(()=>console.log("Connected")) 
}

module.exports=mongoDBConfig