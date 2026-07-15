import { NextResponse } from 'next/server';
import { Product } from '@root/models/Product';
import { connectDB } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); 

  await connectDB();
  const allProducts = await Product.find({});
  
 
  const seed = email ? email.length : 123;
  const shuffled = allProducts.sort(() => (seed % 2 === 0 ? 0.5 - Math.random() : Math.random() - 0.5));
  
  return NextResponse.json(shuffled.slice(0, 9)); 
}