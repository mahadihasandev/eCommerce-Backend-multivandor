const express = require('express')
const _= express.Router()
const AuthRoute=require('./authRoute')
const ProductRoute=require('./ProductRoute')

_.use('/auth',AuthRoute)
_.use('/product',ProductRoute)

module.exports=_