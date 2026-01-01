const mongoose=require('mongoose')

const {Schema}=mongoose

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
    },
    emailVerified:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        enum:['user','merchant','admin'],
        default:'user'
    }
})

module.exports=mongoose.model('userInfo', UserSchema);