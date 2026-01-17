const CategorySchema = require("../model/CategorySchema");
const subCategorySchema = require("../model/SubCategorySchema");


const AddsubCategoryController=async (req,res)=>{
    let {name,ownerId,categoryId}=req.body
    
    
        let existSubCategory=await subCategorySchema.findOne({name:name})
        
        if(existSubCategory){
            res.send({error:"SubCategory Already Exist"})
        }else{
            let subCategoryData=new subCategorySchema({
                name:name,
                ownerId:ownerId,
                categoryId:categoryId,
            })
            subCategoryData.save()
            res.send({success:"SubCategory has been Created"})
            await CategorySchema.findOneAndUpdate({_id:categoryId},{$push:{subcategoryList:subCategoryData._id}})
        }
}

module.exports=AddsubCategoryController