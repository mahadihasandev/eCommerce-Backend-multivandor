const express = require('express')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

const authJwt = require('../../middlewares/authJwt')
const authorizeRoles = require('../../middlewares/authorizeRoles')
const {
  createVendorProduct,
  listMyProducts,
  updateMyProductStock,
} = require('../../controller/VendorProductController')

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ecommerce_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
})

const upload = multer({ storage })

router.use(authJwt)
router.use(authorizeRoles('merchant', 'admin'))

router.post('/products', upload.array('productImg', 10), createVendorProduct)
router.get('/products', listMyProducts)
router.patch('/products/:productId/stock', updateMyProductStock)

module.exports = router
