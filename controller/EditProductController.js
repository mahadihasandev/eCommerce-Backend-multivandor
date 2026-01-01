const ProductSchema = require("../model/ProductSchema")

let EditProductController= async(req,res)=>{
    let {getId}=req.params
    let {name,description,saleprice,regularprice,slug}=req.body
    try {
         let updatedProduct=await ProductSchema.findByIdAndUpdate(getId,{
            name, 
            description, 
            saleprice, 
            regularprice, 
            slug
    })
    if(updatedProduct){
        res.send({success:"product updated successfully"})
    }
    } catch (error) {  
        throw new Error(`${error}`)
    }
   
}

module.exports=EditProductController