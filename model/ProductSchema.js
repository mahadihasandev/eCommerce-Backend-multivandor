const mongoose=require('mongoose')

const {Schema}=mongoose

const ProductSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        
    },
     saleprice:{
        type:Number,
       
    },
     regularprice:{
        type:Number,
        
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    }
    
})

module.exports=mongoose.model('Product',ProductSchema);