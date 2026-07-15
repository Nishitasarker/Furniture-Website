import { NextResponse } from 'next/server';
import { Cart } from '@root/models/Cart';
import { connectDB } from '@/lib/db';
import { auth } from '@/lib/auth'; 


export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.email) {
      return NextResponse.json({ items: [] }, { status: 200 }); 
    }

    const cart = await Cart.findOne({ userEmail: session.user.email });
    return NextResponse.json({ items: cart?.items || [] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: cart এ product add করা
export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    const body = await req.json(); // { productId, name, price, category, imageUrl }

    let cart = await Cart.findOne({ userEmail: session.user.email });

    if (!cart) {
      cart = await Cart.create({
        userEmail: session.user.email,
        userName: session.user.name,
        items: [{ ...body, quantity: 1 }],
      });
    } else {
      const existingItem = cart.items.find((item: any) => item.productId === body.productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ ...body, quantity: 1 });
      }
      await cart.save();
    }

    return NextResponse.json({ items: cart.items }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}