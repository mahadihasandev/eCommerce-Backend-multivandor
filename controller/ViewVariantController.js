const VariantSchema = require("../model/VariantSchema");


let ViewVariantController=async (req,res)=>{
    let Variant=await VariantSchema.find({})
    res.send(Variant);
    
    
}

module.exports=ViewVariantController