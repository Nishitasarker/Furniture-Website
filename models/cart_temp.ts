import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // Product.id এর সাথে ম্যাচ করবে
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, default: 1 },
}, { _id: false });

const CartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true }, // login করা user এর email
  userName: { type: String },
  items: [CartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);