const express = require('express')
require('dotenv').config();
const _= express.Router()
const Auth=require('./api')
// const Api='/api/v1'

_.use(process.env.API_URL,Auth)

module.exports=_