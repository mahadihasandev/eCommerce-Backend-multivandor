let CategorySchema=require('../model/CategorySchema')

let ViewCategoryController=async (req,res)=>{
    let Category=await CategorySchema.find({})
    res.send(Category);
    
    
}

module.exports=ViewCategoryController