const ProductSchema = require("../model/ProductSchema")

const DeleteProductController=async(req,res)=>{
    const {item}=req.params
    deleteProduct=await ProductSchema.findByIdAndDelete(item)
    res.send({success:"Product Deleted"})
}

module.exports=DeleteProductController