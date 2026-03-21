const OrderSchema = require('../model/OrderSchema')

const ViewOrderController = async (_req, res) => {
  const orders = await OrderSchema.find({})
    .sort({ createdAt: -1 })
    .populate('productId')
    .populate('ownerId', 'username email role')

  return res.send(orders)
}

module.exports = ViewOrderController
