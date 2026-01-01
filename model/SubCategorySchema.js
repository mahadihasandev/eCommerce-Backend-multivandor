const mongoose=require('mongoose')

const {Schema}=mongoose

const SubCategorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userinfo',
    },
     categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    }
})

module.exports=mongoose.model('Subcategory',SubCategorySchema);