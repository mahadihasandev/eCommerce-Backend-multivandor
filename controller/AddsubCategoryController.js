const CategorySchema = require("../model/CategorySchema");
const subCategorySchema = require("../model/SubCategorySchema");

const AddsubCategoryController = async (req, res) => {
  try {
    let { name, ownerId, categoryId, slug } = req.body;

    if (!name || !categoryId || !slug) {
      return res
        .status(400)
        .send({ error: "Name, Category, and Slug are required" });
    }

    let existSubCategory = await subCategorySchema.findOne({
      name: name,
      categoryId: categoryId,
    });

    if (existSubCategory) {
      res.send({ error: "SubCategory Already Exist" });
    } else {
      let subCategoryData = new subCategorySchema({
        name: name,
        ownerId: ownerId,
        categoryId: categoryId,
        slug: slug,
      });

      await subCategoryData.save();
      await CategorySchema.findOneAndUpdate(
        { _id: categoryId },
        { $push: { subcategoryList: subCategoryData._id } },
      );
      res.send({ success: "SubCategory has been Created" });
    }
  } catch (error) {
    console.error("Error in AddsubCategoryController:", error);
    if (error.code === 11000) {
      res.status(400).send({
        error: "SubCategory with this name already exists (Duplicate Key)",
      });
    } else {
      res.status(500).send({ error: "Database error" });
    }
  }
};

module.exports = AddsubCategoryController;
