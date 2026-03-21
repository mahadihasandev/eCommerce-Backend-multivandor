let secureApi=(req,res,next)=>{
    if(req.headers.auth=="12345678"){
        next()
    }else{
        res.status(401).send({error:'auth failed'})
    } 
}

module.exports=secureApi