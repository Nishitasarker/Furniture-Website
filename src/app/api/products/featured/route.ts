import { NextResponse } from 'next/server';
import { Product } from '@root/models/Product';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    
    const featuredProducts = await Product.find({})
      .sort({ likes: -1 })
      .limit(8);
      
    return NextResponse.json(featuredProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 });
  }
}