const express = require('express')
const _= express.Router()
const multer = require('multer')

const AddCategoryController=require('../../controller/AddCategoryController')
const addSubCategoryController=require('../../controller/AddsubCategoryController')
const ViewCategoryController = require('../../controller/ViewCategoryController')
const ViewSubCategoryController = require('../../controller/ViewSubCategoryController')
const AddProductController = require('../../controller/AddProductController')
const AddVariantController = require('../../controller/AddVariantController')
const ViewProductController = require('../../controller/ViewProductController')
const ViewVariantController = require('../../controller/ViewVariantController')
const AddBannerController = require('../../controller/AddBannerController')
const ViewBannerController = require('../../controller/ViewBannerController')
const DeleteProductController = require('../../controller/DeleteProductController')
const EditProductController = require('../../controller/EditProductController')
const DeleteBannerController = require('../../controller/DeleteBannerController')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix+ '-' + file.originalname )
    console.log(file);
    
  }
})
const upload = multer({ storage: storage })

_.post('/addcategory',AddCategoryController)
_.get('/viewcategory',ViewCategoryController)
_.post('/addsubcategory',addSubCategoryController)
_.get('/viewsubcategory',ViewSubCategoryController)
_.post('/addproduct',upload.single('productImg'),AddProductController)
_.get('/viewproduct',ViewProductController)
_.delete('/deleteproduct:item',DeleteProductController)
_.delete('/deletebanner:item',DeleteBannerController)
_.post('/editproduct:getId',EditProductController)
_.post('/addbanner',upload.single('productImg'),AddBannerController)
_.get('/viewbanner',ViewBannerController)
_.post('/addvariant',upload.single('productImg'),AddVariantController)
_.get('/viewvariant',ViewVariantController)

module.exports=_