const ProductSchema = require("../model/ProductSchema")
const VariantSchema = require("../model/VariantSchema")

let AddVariantController=async (req,res)=>{
     
    let {variantname,description,image,saleprice,regularprice,slug}=req.body
    
    let existingProduct=await ProductSchema.find({name:variantname})

    if(existingProduct.length<0){
        res.send({error:'Product does not exist'})
    }else{
        let variant=new VariantSchema({
            variantname,
            description,
            image:`/uploads/${req.file.filename}`,
            saleprice,
            regularprice,
            slug 
        })

        variant.save()
        res.send({success:"Variant created successfully"})
    }
}

module.exports=AddVariantController