const BannerSchema=require('../model/BannerSchema')


const DeleteBannerController=async(req,res)=>{
    const {item}=req.params
    deleteBanner=await BannerSchema.findByIdAndDelete(item)
    res.send({success:"Banner Deleted"})    
}

module.exports=DeleteBannerController