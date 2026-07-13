import { NextResponse } from 'next/server';
import { Product } from '@root/models/Product';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // ডাটাবেসে সেভ করুন
    const newProduct = await Product.create(body);
    
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
  }
}