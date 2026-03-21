let emailRegex=require('../helper/EmailRegex');
const emailVerification = require('../helper/emailVerification');
let PasswordRegex=require('../helper/PasswordRegex')
let PasswordRegexEight=require('../helper/PasswordRegexEight')
const UserSchema = require('../model/UserSchema')
const validateEmailDomain = require('../helper/validateEmailDomain')
const bcrypt = require('bcrypt');
var otpGenerator = require('otp-generator')
var jwt = require('jsonwebtoken');


let Registration=async(req,res)=>{  
    let {username,email,password}=req.body
    const profileImage = req.file?.path || ''
    if(!username){
        return res.status(400).send({error:"Pleaser Enter a user name"})
    }else if(!email){
        return res.status(400).send({error:"Pleaser Enter a email"})
    }else if(!password){
        return res.status(400).send({error:"Pleaser Enter a password"})
    }else if(!emailRegex(email)){
       return res.status(400).send({error:"Enter a valid email"})
    }else if(!PasswordRegex(password)){
        return res.status(400).send({error:"enter a at least 1 digit" })
    }else if(!PasswordRegexEight(password)){
          return res.status(400).send({error:"enter a at least 8 character" })
    }else{       
        const hasValidDomain = await validateEmailDomain(email)
        if(!hasValidDomain){
            return res.status(400).send({error:"Email domain is invalid or cannot receive mail"})
        }

        let otp=otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        var emailEncode = jwt.sign(email,'arnob');

        let existsUser= await UserSchema.findOne({
            $or:[
                {email:email},
                {email:emailEncode}
            ]
        })

        if(existsUser){
            if(existsUser.emailVerified){
                return res.status(409).send({error:`${email} already exist choose a different email.`})
            }

            existsUser.username = username
            existsUser.otp = otp
            if (profileImage) {
                existsUser.profileImage = profileImage
            }
            await existsUser.save()

            try {
                await emailVerification(email, otp)
            } catch (mailError) {
                return res.status(500).send({error:"Failed to send verification email. Check SMTP config and recipient email."})
            }

            return res.send({
                success: "Verification code sent to your email.",
                email,
                emailVerified: false,
            })
        }

        bcrypt.genSalt(10,function(err, salt){
            if(err){
                return res.status(500).send({error:"Failed to process password"})
            }

            bcrypt.hash(password, salt,async function(err, hash) {
                if(err){
                    return res.status(500).send({error:"Failed to process password"})
                }

                let userData=new UserSchema({
                    username:username,
                    email:email,
                    password:hash,
                    otp:otp,
                    emailVerified:false,
                    profileImage,
                })
                await userData.save()

                try {
                    await emailVerification(email, otp)
                } catch (mailError) {
                    await UserSchema.findByIdAndDelete(userData._id)
                    return res.status(500).send({error:"Failed to send verification email. Check SMTP config and recipient email."})
                }

                return res.send({
                    success: "Verification code sent to your email.",
                    email: userData.email,
                    emailVerified: false,
                })
            });
        });
    }
}
module.exports=Registration