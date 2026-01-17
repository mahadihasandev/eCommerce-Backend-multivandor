const mongoose=require('mongoose')

const {Schema}=mongoose

const AddToCartSchema=new Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userInfo"
    },
    quantity:{
        type:Number,
        
    },
  
})

module.exports=mongoose.model('Addtocart',AddToCartSchema);