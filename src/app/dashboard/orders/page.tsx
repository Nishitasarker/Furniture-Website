import { connectDB } from "@/lib/db";
import { Cart } from "@root/models/Cart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import OrderTable from "@/components/dashboard/OrderTable";

export default async function OrdersPage() {
  await connectDB();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.email) {
    return <div className="p-8">Please login to view your orders.</div>;
  }

  // ডাটাবেস থেকে ইউজারের কার্ট আইটেমগুলো আনা
  const cart = await Cart.findOne({ userEmail: session.user.email }).lean();
const orders = cart?.items ? JSON.parse(JSON.stringify(cart.items)) : [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
       My Curated Collection </h1>
      <OrderTable orders={orders} />
    </div>
  );
}