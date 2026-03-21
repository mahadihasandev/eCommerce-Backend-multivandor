const express = require('express')
const _= express.Router()
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
const LoginController=require('../../controller/LoginController')
const RegistrationController=require('../../controller/RegistrationController')
const secureApi = require('../../middlewares/secureApi')
const authJwt = require('../../middlewares/authJwt')
const Otp=require('../../controller/OtpController')
const VerifyEmailController=require('../../controller/VerifyEmailController')
const ForgetPassword=require('../../controller/ForgetPasswordController')
const changePasswordController = require('../../controller/ChangePasswordController')
const UploadProfileImageController = require('../../controller/UploadProfileImageController')

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'ecommerce_uploads/profiles',
		allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
	},
})

const upload = multer({ storage })


_.post('/otp',Otp)
_.get('/verify-email', VerifyEmailController)
_.post('/registration', secureApi, upload.single('profileImg'), RegistrationController)
_.post("/login",LoginController)
_.post("/forgetpassword",ForgetPassword)
_.post("/changepassword",changePasswordController)
_.post('/profile-image', authJwt, upload.single('profileImg'), UploadProfileImageController)

module.exports=_