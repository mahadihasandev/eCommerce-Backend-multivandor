const mongoose = require('mongoose')

const { Schema } = mongoose

const OrderSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userInfo',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    note: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

OrderSchema.index({ status: 1, createdAt: -1 })

module.exports = mongoose.model('Order', OrderSchema)
