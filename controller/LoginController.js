const UserSchema = require("../model/UserSchema")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

let Login=async(req,res)=>{  
    let {email,password}=req.body
    if(!email || !password){
        return res.status(400).send({error:'email and password are required'})
    }

    var emailEncode = jwt.sign(email,'arnob');
    let existUser=await UserSchema.findOne({
        $or:[
            {email:emailEncode},
            {email:email}
        ]
    })

    if(existUser){
         bcrypt.compare(password, existUser.password, function(err, result) {
            if(err){
                return res.status(500).send({error:'failed to validate credentials'})
            }
            if(result){
                if(!existUser.emailVerified){
                    return res.status(403).send({error:'Verify your email first'})
                }

                const jwtSecret = process.env.JWT_SECRET || 'dev_jwt_secret'
                const decodedEmail = (() => {
                    try {
                        return jwt.verify(existUser.email, 'arnob')
                    } catch (_error) {
                        return existUser.email
                    }
                })()

                const token = jwt.sign(
                    {
                        sub: existUser._id.toString(),
                        role: existUser.role,
                        email: decodedEmail,
                    },
                    jwtSecret,
                    { expiresIn: '7d' }
                )

                res.send({
                    username:existUser.username,
                    email:decodedEmail,
                    emailVerified:existUser.emailVerified,
                    role:existUser.role,
                    id:existUser._id,
                    profileImage: existUser.profileImage || '',
                    image: existUser.profileImage || '',
                    avatar: existUser.profileImage || '',
                    token,
                })
            }else{
                res.status(401).send({error:'wrong user name or password'})
            }
    })       
    }else{
        res.status(404).send({error:'User does not exist'})
    }
}
module.exports=Login