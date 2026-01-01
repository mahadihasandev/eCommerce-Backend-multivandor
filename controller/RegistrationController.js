let emailRegex=require('../helper/EmailRegex');
const emailVerification = require('../helper/emailVerification');
let PasswordRegex=require('../helper/PasswordRegex')
let PasswordRegexEight=require('../helper/PasswordRegexEight')
const UserSchema = require('../model/UserSchema')
const bcrypt = require('bcrypt');
var otpGenerator = require('otp-generator')
var jwt = require('jsonwebtoken');


let Registration=async(req,res)=>{  
    let {username,email,password}=req.body
    if(!username){
        res.send({error:"Pleaser Enter a user name"})
    }else if(!email){
        res.send({error:"Pleaser Enter a email"})
    }else if(!password){
        res.send({error:"Pleaser Enter a password"})
    }else if(!emailRegex(email)){
       res.send({error:"Enter a valid email"})
    }else if(!PasswordRegex(password)){
        res.send({error:"enter a at least 1 digit" })
    }else if(!PasswordRegexEight(password)){
          res.send({error:"enter a at least 8 character" })
    }else{       
        let otp=otpGenerator.generate(6, { upperCase: false, specialChars: false });
       
        var emailEncode = jwt.sign(email,'arnob');
        var otpEncode = jwt.sign(otp,'arnob');

        let existsUser= await UserSchema.find({email:email})

        if(existsUser.length>0){
            res.send({error:`${existsUser[0].email} already exist choose a different email.`})
        }else{
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(password, salt, function(err, hash) {
            
            let userData=new UserSchema({
                username:username,
                email:emailEncode,
                password:hash,
                otp:otpEncode,
       })
        userData.save()
       
       emailVerification(emailEncode,otpEncode) 
       res.send({username:userData.username,email:userData.email,otp:userData.otp})      
    });
});
}}}
module.exports=Registration