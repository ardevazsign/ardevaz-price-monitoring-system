import mongoose from 'mongoose';

// Delivery Item Schema
const itemSchema = new mongoose.Schema({
  quantity: Number,
  unit: String,
  article: String,
  unitPrice: Number,
  totalAmount: Number,
});

// Receipt Schema
const receiptSchema = new mongoose.Schema(
  {
    supplierName: String,
    status: {
      type: String,
      enum: ['Unpaid', 'Paid'], // Make sure values match exactly
      default: 'Unpaid',
    },
    receiptNumber: String,
    deliveryDate: String,
    items: [itemSchema],
    totalAmount: Number,
    totalQuantity: Number,
    totalItems: Number,
    totalKilograms: Number,
  },
  { timestamps: true }
);

const receiptModel =
  mongoose.model.receipt || mongoose.model('Receipt', receiptSchema);

export default receiptModel;
