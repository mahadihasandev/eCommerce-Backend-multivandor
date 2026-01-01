let SubCategorySchema=require('../model/SubCategorySchema')

let ViewSubCategoryController=async (req,res)=>{
    let SubCategory=await SubCategorySchema.find({}).populate('categoryId')
    res.send(SubCategory);
    
    
}

module.exports=ViewSubCategoryController