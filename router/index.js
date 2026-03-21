const express = require('express')
require('dotenv').config();
const _= express.Router()
const Auth=require('./api')
const API_BASE_PATH = process.env.API_URL || '/api/v1'

_.use(API_BASE_PATH,Auth)

module.exports=_