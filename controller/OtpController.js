const verifyOtpForEmail = require("../helper/verifyOtpForEmail")

let otp=async (req,res)=>{
   let {otp,email}=req.body
   const result = await verifyOtpForEmail(email, otp)

   if(!result.ok){
      return res.status(result.status).send({error: result.message})
   }

   return res.send({success: result.message})
}

module.exports=otp