let CategorySchema=require('../model/CategorySchema')

let ViewCategoryController=async (req,res)=>{
    let Category=await CategorySchema.find({}).populate('subcategoryList')
    res.send(Category);
    
    
}

module.exports=ViewCategoryController