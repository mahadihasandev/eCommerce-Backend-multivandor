const OrderSchema = require('../model/OrderSchema')

const AddOrderController = async (req, res) => {
  const { productId, ownerId, quantity, total, status, note } = req.body

  if (!productId || !ownerId) {
    return res.status(400).send({ error: 'productId and ownerId are required' })
  }

  const order = new OrderSchema({
    productId,
    ownerId,
    quantity: Number(quantity || 1),
    total: Number(total || 0),
    status: status || 'pending',
    note: note || '',
  })

  await order.save()
  return res.status(201).send({ success: 'order created', order })
}

module.exports = AddOrderController
