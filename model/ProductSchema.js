const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: [String],
  },
  saleprice: {
    type: Number,
  },
  regularprice: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
  },
  quickoverview: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInfo",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.index({ vendorId: 1, createdAt: -1 });
ProductSchema.index({ categoryId: 1, subCategoryId: 1 });

module.exports = mongoose.model("Product", ProductSchema);
