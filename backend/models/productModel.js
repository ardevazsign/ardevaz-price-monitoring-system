import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  item: { type: String, required: true },
  unit: { type: Array, required: true },
  supplierName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  Updated: { type: Date, default: Date.now },
});
// Middleware to update `priceUpdated` only when price changess
productSchema.pre('save', function (next) {
  if (this.isModified('price')) {
    this.priceUpdated = new Date();
  }
  next();
});

// prettier-ignore
const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
