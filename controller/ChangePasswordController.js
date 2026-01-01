const UserSchema=require('../model/UserSchema')
const bcrypt = require('bcrypt');

const changePasswordController = async (req, res) => {
    let {email,newpassword}=req.body
    let existingUser=await UserSchema.findOne({email:email})

    bcrypt.hash(newpassword, 10, async function(err, hash) {
     if(existingUser){
        await UserSchema.findOneAndUpdate({email:email},{password:hash})
        res.send({success:"Reset Password"})

    }else{
         res.send({error:"Credential invited"})
        
    }
});
    

}

module.exports = changePasswordController