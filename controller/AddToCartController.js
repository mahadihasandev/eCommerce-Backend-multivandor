const AddToCartSchema = require("../model/AddToCartSchema")

let AddToCartController=async (req,res)=>{
    let {cartId,ownerId,quantity,stock}=req.body


       let existCart=await AddToCartSchema.find({cartId:cartId})
       if(existCart.length>0){
        if(req.query.type=='increment'){
            await AddToCartSchema.findOneAndUpdate({_id:existCart[0]._id},
                {quantity:existCart[0].quantity+quantity},{new:true}
            )
            res.send({success:"Incremented"})
        }else if(req.query.type=='decrement'){
            if(existCart[0].quantity>0){
                let newQuantity = existCart[0].quantity - quantity;
                if(newQuantity <= 0){
                    await AddToCartSchema.findOneAndDelete({_id:existCart[0]._id})
                } else {
                    await AddToCartSchema.findOneAndUpdate({_id:existCart[0]._id},
                    {quantity: newQuantity},{new:true})
                }
            }
            res.send({success:"Decremented"})
        }else{
            res.send({error:"Product already added"})
        }
        }else{
        let cartData=new AddToCartSchema({
            cartId,
            ownerId,
            quantity,
        })
        cartData.save()
        res.send({
            success:"Cart Created"
        })
       }
    
}

module.exports=AddToCartController