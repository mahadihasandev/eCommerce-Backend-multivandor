const CategorySchema = require("../model/CategorySchema");
const ProductSchema = require("../model/ProductSchema");
const SubCategorySchema = require("../model/SubCategorySchema");
require("dotenv").config();

let AddProductController = async (req, res) => {
  let {
    name,
    description,
    image,
    saleprice,
    regularprice,
    slug,
    stock,
    createdAt,
    quickoverview,
    categoryId,
    subCategoryId,
  } = req.body;
  const imageUrls = req.files.map((file) => file.path);

  let existingProduct = await ProductSchema.find({ name: name });

  if (existingProduct.length > 0) {
    res.send({ error: "Product already exist" });
  } else {
    let discount = regularprice - saleprice;
    let product = new ProductSchema({
      name,
      description,
      image: imageUrls,
      saleprice,
      regularprice,
      stock,
      slug,
      createdAt,
      discount,
      quickoverview,
      categoryId,
      subCategoryId,
    });

    product.save();
    res.send({ success: "Product created successfully" });
    await CategorySchema.findOneAndUpdate(
      { _id: categoryId },
      { $push: { productList: product._id } },
    );
    await SubCategorySchema.findOneAndUpdate(
      { _id: subCategoryId },
      { $push: { productList: product._id } },
    );
  }
};

module.exports = AddProductController;
