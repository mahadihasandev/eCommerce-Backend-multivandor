const SubCategorySchema = require("../model/SubCategorySchema");


let ViewAllSubCatController=async (req,res)=>{
    let allSubCat=await SubCategorySchema.find({categoryId:req.query.slug})
     res.send(allSubCat)
}

module.exports=ViewAllSubCatController