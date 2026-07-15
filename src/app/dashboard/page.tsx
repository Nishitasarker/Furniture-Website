import { connectDB } from "@/lib/db"; // নিশ্চিত করুন পাথটি সঠিক আছে
import { Product } from "@root/models/Product";
import { Cart } from "@root/models/Cart";
import Overview from "@/components/dashboard/Overview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  await connectDB();
  const session = await auth.api.getSession({ headers: await headers() });

  const totalProducts = await Product.countDocuments();
  const totalStock = await Product.aggregate([{ $group: { _id: null, total: { $sum: "$stockCount" } } }]);
  const categories = await Product.distinct("category");
  
  const categoryData = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);

  const userCart = session ? await Cart.findOne({ userEmail: session.user.email }) : null;
  const cartItemsCount = userCart?.items.length || 0;
  
  
  const contributedCount = await Product.countDocuments();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome to <span className="text-orange-600">FURNS</span> Dashboard
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Manage your furniture inventory, track stocks, and analyze your contributions.
        </p>
      </div>
            <Overview 
        totalProducts={totalProducts} 
        totalStock={totalStock[0]?.total || 0}
        categoriesCount={categories.length}
        cartItemsCount={cartItemsCount}
        contributedCount={contributedCount}
        categoryData={categoryData}
      />
    </div>
  );
}