import { NextResponse } from 'next/server';
import { Product } from '@root/models/Product';
import { connectDB } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // ইউজারের ইমেইল

  await connectDB();
  const allProducts = await Product.find({});
  
  // লজিক: ইমেইলের উপর ভিত্তি করে প্রোডাক্ট শাফেল করা
  // যাতে ইউজারের জন্য রেন্ডম কিন্তু ফিক্সড প্রোডাক্ট থাকে
  const seed = email ? email.length : 123;
  const shuffled = allProducts.sort(() => (seed % 2 === 0 ? 0.5 - Math.random() : Math.random() - 0.5));
  
  return NextResponse.json(shuffled.slice(0, 9)); // ৯টি প্রোডাক্ট পাঠালাম যাতে ৩টি করে ৩ পাতা হয়
}