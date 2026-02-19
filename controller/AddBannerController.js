const BannerSchema = require("../model/BannerSchema")
require('dotenv').config();


let AddBannerController=async (req,res)=>{
    let {name,description,image,productSlug}=req.body
    const imageUrl = req.file.path;


        let banner=new BannerSchema({
            name,
            description,
            image:imageUrl,
            productSlug,
           
        })

        banner.save()
        res.send({success:"Banner created successfully"})
    
}

module.exports=AddBannerController