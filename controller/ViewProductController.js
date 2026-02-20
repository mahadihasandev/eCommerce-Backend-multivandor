const ProductSchema = require("../model/ProductSchema");

let ViewProductController=async (req,res)=>{
    let Product=await ProductSchema.find({})
    res.send(Product);  
}

module.exports=ViewProductController