const mongoose=require('mongoose')

const {Schema}=mongoose

const CategorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userinfo',
    },
    
})

module.exports=mongoose.model('Category',CategorySchema);