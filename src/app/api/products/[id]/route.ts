import { NextResponse } from 'next/server';
import { Product } from '@root/models/Product';
import { connectDB } from '@/lib/db';

export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params; 

    const product = await Product.findOne({ id: id });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}