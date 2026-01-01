var cors = require('cors')
const express = require('express')
const app = express()
const port = 8000
const router=require('./router')
let mongoDBConfig=require('./dbConfig/mongoDBConfig')
const path=require('path')
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads',express.static(path.join(__dirname,"uploads")))

mongoDBConfig()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
