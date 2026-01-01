let CategorySchema = require("../model/CategorySchema");


let AddCategoryController=async(req,res)=>{
    let {name,ownerId}=req.body
   
let existCategory=await CategorySchema.findOne({name:name})
if(existCategory){
 res.send({error:"Category Already Exist"})
}else{
    let categoryData=new CategorySchema({
    name:name,
    ownerId:ownerId,
})

categoryData.save()
 res.send({success:"Category has been Created"})
}
}

module.exports=AddCategoryController