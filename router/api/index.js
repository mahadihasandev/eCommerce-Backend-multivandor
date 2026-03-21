const express = require('express')
const _= express.Router()
const AuthRoute=require('./authRoute')
const ProductRoute=require('./ProductRoute')
const vendorRoute = require('./vendorRoute')

_.use('/auth',AuthRoute)
_.use('/product',ProductRoute)
_.use('/vendor', vendorRoute)

module.exports=_