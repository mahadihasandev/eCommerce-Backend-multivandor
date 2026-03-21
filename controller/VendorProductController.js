const ProductSchema = require('../model/ProductSchema')

const createVendorProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      saleprice,
      regularprice,
      slug,
      stock,
      quickoverview,
      categoryId,
      subCategoryId,
    } = req.body

    if (!name || !slug) {
      return res.status(400).send({ error: 'name and slug are required' })
    }

    const existing = await ProductSchema.findOne({ $or: [{ name }, { slug }] })
    if (existing) {
      return res.status(409).send({ error: 'product name or slug already exists' })
    }

    const imageUrls = Array.isArray(req.files) ? req.files.map((file) => file.path) : []
    const sale = Number(saleprice || 0)
    const regular = Number(regularprice || 0)

    const product = await ProductSchema.create({
      name,
      description,
      image: imageUrls,
      saleprice: sale,
      regularprice: regular,
      stock: Number(stock || 0),
      slug,
      discount: Math.max(regular - sale, 0),
      quickoverview,
      categoryId,
      subCategoryId,
      vendorId: req.user.id,
      isActive: true,
    })

    return res.status(201).send({ success: 'product created', product })
  } catch (error) {
    return res.status(500).send({ error: 'failed to create vendor product', detail: error.message })
  }
}

const listMyProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find({ vendorId: req.user.id }).sort({ createdAt: -1 })
    return res.send(products)
  } catch (error) {
    return res.status(500).send({ error: 'failed to load vendor products', detail: error.message })
  }
}

const updateMyProductStock = async (req, res) => {
  try {
    const { productId } = req.params
    const { stock, isActive } = req.body

    const product = await ProductSchema.findOne({ _id: productId, vendorId: req.user.id })
    if (!product) {
      return res.status(404).send({ error: 'product not found for this vendor' })
    }

    if (stock !== undefined) {
      product.stock = Number(stock)
    }

    if (isActive !== undefined) {
      product.isActive = Boolean(isActive)
    }

    await product.save()
    return res.send({ success: 'product updated', product })
  } catch (error) {
    return res.status(500).send({ error: 'failed to update vendor product', detail: error.message })
  }
}

module.exports = {
  createVendorProduct,
  listMyProducts,
  updateMyProductStock,
}
