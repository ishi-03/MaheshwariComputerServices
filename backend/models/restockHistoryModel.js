import mongoose from 'mongoose';

const restockHistorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const RestockHistory = mongoose.model('RestockHistory', restockHistorySchema);
