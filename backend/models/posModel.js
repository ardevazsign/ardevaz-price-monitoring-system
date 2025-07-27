import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  kilos: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const posSchema = new mongoose.Schema(
  {
    date: {
      type: String, // formatted as 'yyyy-MM-dd'
      required: true,
    },
    items: [itemSchema],
    totalKilos: {
      type: Number,
      required: true,
    },
    totalCash: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const POS = mongoose.model('POS', posSchema);

export default POS;
