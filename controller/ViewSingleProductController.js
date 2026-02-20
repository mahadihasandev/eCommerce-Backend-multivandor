const ProductSchema = require("../model/ProductSchema");



let ViewSingleProductController=async (req,res)=>{
    let product=await ProductSchema.findById(req.params.id)
    res.send(product);
    
    
}

module.exports=ViewSingleProductController