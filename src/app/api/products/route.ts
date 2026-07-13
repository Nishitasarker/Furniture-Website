import { NextResponse } from 'next/server';
import { Product } from '@root/models/Product';
import { connectDB } from '@/lib/db';

// GET: সব প্রোডাক্ট পাওয়ার জন্য
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST: নতুন প্রোডাক্ট যোগ করার জন্য
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
  }
}