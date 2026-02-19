const AddDiscountSchema = require("../model/AddDiscountSchema")


let AddDiscountController=async(req,res)=>{
    let{discountname,discountamoun,discounttype,discountrange}=req.body
    const existDiscount=await AddDiscountSchema.find({
        discountname:discountname
    })
    console.log(existDiscount);
    
if(existDiscount.length>0){
    return res.send({error:"Discount Already exist"})
}else if(discountamoun>100&&discounttype=='parentage'){
    res.send({error:"Invalid Discount"})
}else if(discountamoun>100&&discounttype=='delivery'){
    res.send({error:"Invalid Discount"})
}else{
     const discount=new AddDiscountSchema({
    discountname:discountname,
    discountamoun:discountamoun,
    discounttype:discounttype,
    discountrange:discountrange,
   })
   discount.save()
   res.send({success:"Discount Successfully Created"})
}
  
    
 

}

module.exports=AddDiscountController