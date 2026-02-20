const ProductSchema = require("../model/ProductSchema");

let TopDiscountController=async (req,res)=>{
    
    let product=await ProductSchema.find({})
    let discount = null
    
    if(product && product.length > 0){
        // Filter products that have discount and map them
        discount = product
            .filter(p => p.discount && p.discount > 0) // Only include products with discount
            .map(p => ({      
                _id: p._id,
                name: p.name,
                discount: p.discount,
                regularprice: p.regularprice,
                saleprice: p.saleprice,
                image: p.image,
                stock: p.stock
            }))
            .sort((a, b) => b.discount - a.discount) // Sort high to low
    }
    
    res.send({success:"Discount Retrieved", discount})
}

module.exports=TopDiscountController