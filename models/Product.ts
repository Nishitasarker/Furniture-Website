import mongoose, { Document, Model } from 'mongoose';


export interface IProduct extends Document {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description?: string;
  isFeatured: boolean;
  stockCount: number;
  likes: number;
  react: boolean; // এখানে এটি ডিফাইন করা আছে
  tags: string[];
  createdAt: Date;
}

const ProductSchema = new mongoose.Schema({
  // সাধারণত MongoDB তে _id ব্যবহার করাই ভালো, তবে আপনার স্ট্রাকচার অনুযায়ী:
  
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  isFeatured: { type: Boolean, default: false }, // ডিফল্ট false রাখা হয়েছে
  stockCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  react: { type: Boolean, default: false },
  tags: [{ type: String }], // Tags একটি অ্যারে হিসেবে থাকবে
  createdAt: { type: Date, default: Date.now },
});

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);