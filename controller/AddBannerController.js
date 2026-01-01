const BannerSchema = require("../model/BannerSchema")


let AddBannerController=async (req,res)=>{
    let {name,description,image}=req.body

        let banner=new BannerSchema({
            name,
            description,
            image:`/uploads/${req.file.filename}`,
           
        })

        banner.save()
        res.send({success:"Banner created successfully"})
    
}

module.exports=AddBannerController