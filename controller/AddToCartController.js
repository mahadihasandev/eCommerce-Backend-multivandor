const AddToCartSchema = require("../model/AddToCartSchema")

let AddToCartController=async (req,res)=>{
    let {cartId,ownerId,quantity}=req.body


       let existCart=await AddToCartSchema.find({cartId:cartId})
       if(existCart.length>0){
        res.send({error:"Product already added"}) 
        if(req.query.type=='increment'){
        await AddToCartSchema.findOneAndUpdate({_id:existCart[0]._id},
            {quantity:existCart[0].quantity+quantity},{new:true}
        )
        }else if(req.query.type=='decrement'){
        await AddToCartSchema.findOneAndUpdate({_id:existCart[0]._id},
            {quantity:existCart[0].quantity-quantity},{new:true}
        )
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