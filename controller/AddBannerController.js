const BannerSchema = require("../model/BannerSchema")
require('dotenv').config();


let AddBannerController=async (req,res)=>{
    let {name,description,image}=req.body
    const imageUrl = req.file.path;


        let banner=new BannerSchema({
            name,
            description,
            image:imageUrl,
           
        })

        banner.save()
        res.send({success:"Banner created successfully"})
    
}

module.exports=AddBannerController