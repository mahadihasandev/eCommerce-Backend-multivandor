const mongoose=require('mongoose')

const {Schema}=mongoose

const BannerSchema=new Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        
    },
    productSlug:{
        type:String,
    }
  
})

module.exports=mongoose.model('Banner',BannerSchema);