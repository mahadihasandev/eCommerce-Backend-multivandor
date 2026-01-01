const ProductSchema = require("../model/ProductSchema")
require('dotenv').config();

let AddProductController=async (req,res)=>{
    let {name,description,image,saleprice,regularprice,slug}=req.body
    let existingProduct=await ProductSchema.find({name:name})

    if(existingProduct.length>0){
        res.send({error:'Product already exist'})
    }else{
        let product=new ProductSchema({
            name,
            description,
            image:`${process.env.PROD_API}/uploads/${req.file.filename}`,
            saleprice,
            regularprice,
            slug 
        })

        product.save()
        res.send({success:"Product created successfully"})
    }
}

module.exports=AddProductController