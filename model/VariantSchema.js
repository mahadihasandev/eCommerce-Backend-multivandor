const mongoose=require('mongoose')

const {Schema}=mongoose

const VariantSchema=new Schema({
    variantname:{
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

module.exports=mongoose.model('Variant',VariantSchema);