const express = require("express");
const _ = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const AddCategoryController = require("../../controller/AddCategoryController");
const addSubCategoryController = require("../../controller/AddsubCategoryController");
const ViewCategoryController = require("../../controller/ViewCategoryController");
const ViewSubCategoryController = require("../../controller/ViewSubCategoryController");
const AddProductController = require("../../controller/AddProductController");
const AddVariantController = require("../../controller/AddVariantController");
const ViewProductController = require("../../controller/ViewProductController");
const ViewVariantController = require("../../controller/ViewVariantController");
const AddBannerController = require("../../controller/AddBannerController");
const ViewBannerController = require("../../controller/ViewBannerController");
const DeleteProductController = require("../../controller/DeleteProductController");
const EditProductController = require("../../controller/EditProductController");
const DeleteBannerController = require("../../controller/DeleteBannerController");
const ViewAllSubCatController = require("../../controller/ViewAllSubCatController");
const AddToCartController = require("../../controller/AddToCartController");
const ViewAddToCartController = require("../../controller/ViewAddToCartController");
const AddDiscountController = require("../../controller/AddDiscountController");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce_uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage: storage });

// Controllers

// Routes
_.post("/addcategory", AddCategoryController);
_.get("/viewcategory", ViewCategoryController);
_.post("/addsubcategory", addSubCategoryController);
_.get("/viewsubcategory", ViewSubCategoryController);

// Product Routes - Notice the '/' before ':' in delete/edit
_.post("/addproduct", upload.array("productImg", 10), AddProductController);
_.get("/viewproduct", ViewProductController);
_.delete("/deleteproduct/:item", DeleteProductController);
_.post("/editproduct/:getId", EditProductController);

// Banner Routes
_.post("/addbanner", upload.single("productImg"), AddBannerController);
_.get("/viewbanner", ViewBannerController);
_.delete("/deletebanner/:item", DeleteBannerController);

// Variant Routes
_.post("/addvariant", upload.single("productImg"), AddVariantController);
_.get("/viewvariant", ViewVariantController);
_.get("/viewallsubcategory", ViewAllSubCatController);
_.post("/addtocart", AddToCartController);
_.get("/viewaddtocart", ViewAddToCartController);
_.post("/adddiscount", AddDiscountController);

module.exports = _;
