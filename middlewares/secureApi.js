let secureApi=(req,res,next)=>{
    if(req.headers.auth=="12345678"){
        next()
    }else{
        res.send({error:'auth failed'})
    } 
}

module.exports=secureApi