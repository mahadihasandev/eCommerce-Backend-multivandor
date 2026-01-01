const UserSchema = require("../model/UserSchema")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

let Login=async(req,res)=>{  
    let {email,password}=req.body
    var emailEncode = jwt.sign(email,'arnob');
    let existUser=await UserSchema.findOne({email:emailEncode})

    if(existUser){
         bcrypt.compare(password, existUser.password, function(err, result) {
            if(result){
                res.send({
                    username:existUser.username,
                    email:existUser.email,
                    emailVerified:existUser.emailVerified,
                    role:existUser.role,
                    id:existUser._id,
                })
            }else{
                res.send('wrong user name or password')
            }
    })       
    }else{
        res.send('User Does not exist')
    }
}
module.exports=Login