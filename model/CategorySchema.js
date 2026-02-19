const mongoose=require('mongoose')

const {Schema}=mongoose

const CategorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userInfo',
    },
     subcategoryList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategory',
    }],
    productList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }],
    
})

module.exports=mongoose.model('Category',CategorySchema);