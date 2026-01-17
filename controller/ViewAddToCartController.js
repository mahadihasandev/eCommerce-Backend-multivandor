const AddToCartSchema = require("../model/AddToCartSchema");



let ViewAddToCartController=async (req,res)=>{
    console.log(req);
    
    let cart=await AddToCartSchema.find({}).populate("cartId")
    res.send(cart);
    
    
}

module.exports=ViewAddToCartController