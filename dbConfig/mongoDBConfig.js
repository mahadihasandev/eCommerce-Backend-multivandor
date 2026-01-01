const mongoose = require('mongoose');
require('dotenv').config();


const mongoDBConfig=()=>{
    
    mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(()=>console.log("Connected")) 
}

module.exports=mongoDBConfig