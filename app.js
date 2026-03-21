const cors = require('cors')
const express = require('express')
const path = require('path')
const router = require('./router')
const mongoDBConfig = require('./dbConfig/mongoDBConfig')

require('dotenv').config()

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

mongoDBConfig()

module.exports = app