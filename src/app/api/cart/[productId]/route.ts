import { NextResponse } from 'next/server';
import { Cart } from '@root/models/Cart';
import { connectDB } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    await connectDB();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    const { productId } = await params;
    const { searchParams } = new URL(req.url);
    const removeAll = searchParams.get('all') === 'true';

    const cart = await Cart.findOne({ userEmail: session.user.email });
    if (!cart) return NextResponse.json({ items: [] }, { status: 200 });

    const item = cart.items.find((i: any) => i.productId === productId);
    if (item) {
      if (!removeAll && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items = cart.items.filter((i: any) => i.productId !== productId);
      }
      await cart.save();
    }

    return NextResponse.json({ items: cart.items }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}