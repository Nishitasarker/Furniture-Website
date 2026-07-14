import { NextResponse } from 'next/server';
import { Product } from '@root/models/Product';
import { connectDB } from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { increment } = await req.json(); // ফ্রন্টএন্ড থেকে আসা +1 বা -1

    // $inc ব্যবহার করে ডাটাবেজে আপডেট করুন
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id }, // আপনার প্রোডাক্টের unique ID ফিল্ড
      { $inc: { likes: increment } },
      { new: true } // আপডেট হওয়ার পর নতুন ডাটা রিটার্ন করবে
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, likes: updatedProduct.likes }, { status: 200 });
  } catch (error) {
    console.error("Like update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}