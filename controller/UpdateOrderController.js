const OrderSchema = require('../model/OrderSchema')

const UpdateOrderController = async (req, res) => {
  const { id } = req.params
  const { status, quantity, total, note } = req.body

  const payload = {}
  if (status) payload.status = status
  if (quantity !== undefined) payload.quantity = Number(quantity)
  if (total !== undefined) payload.total = Number(total)
  if (note !== undefined) payload.note = note

  const updatedOrder = await OrderSchema.findByIdAndUpdate(id, payload, { new: true })

  if (!updatedOrder) {
    return res.status(404).send({ error: 'order not found' })
  }

  return res.send({ success: 'order updated', order: updatedOrder })
}

module.exports = UpdateOrderController
