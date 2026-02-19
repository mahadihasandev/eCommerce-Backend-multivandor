const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userinfo",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  slug: {
    type: String,
    required: true,
  },
  productList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Subcategory", SubCategorySchema);
