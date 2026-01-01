const express = require('express')
const _= express.Router()
const LoginController=require('../../controller/LoginController')
const RegistrationController=require('../../controller/RegistrationController')
const secureApi = require('../../middlewares/secureApi')
const Otp=require('../../controller/OtpController')
const ForgetPassword=require('../../controller/ForgetPasswordController')
const changePasswordController = require('../../controller/ChangePasswordController')


_.post('/otp',Otp)
_.post("/registration",secureApi,RegistrationController)
_.post("/login",LoginController)
_.post("/forgetpassword",ForgetPassword)
_.post("/changepassword",changePasswordController)

module.exports=_