const BannerSchema = require("../model/BannerSchema");


let ViewBannerController=async (req,res)=>{
    let Banner=await BannerSchema.find({})
    res.send(Banner);
    
    
}

module.exports=ViewBannerController