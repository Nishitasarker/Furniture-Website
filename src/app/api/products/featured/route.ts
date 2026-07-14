import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    // লাইক অনুযায়ী ডিসেন্ডিং অর্ডারে ৮টি প্রোডাক্ট নেওয়া
    const featuredProducts = await Product.find({})
      .sort({ likes: -1 })
      .limit(8);
      
    return NextResponse.json(featuredProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 });
  }
}