let CategorySchema=require('../model/CategorySchema')

let ViewCategoryController=async (req,res)=>{
    let Category=await CategorySchema.find({}).populate('subcategoryList').populate('productList')
    res.send(Category);
    
    
}

module.exports=ViewCategoryController