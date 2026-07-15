'use client';
import { motion } from 'framer-motion';

export default function OrderTable({ orders }: { orders: any[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <p className="text-gray-400">No items in your order list yet.</p>
      </div>
    );
  }

  // Calculate total
  const total = orders.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] overflow-hidden"
    >
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Your Selected Furniture</h2>
        <p className="text-sm text-gray-500">Overview of your current order items.</p>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-6 font-semibold">Product</th>
            <th className="p-6 font-semibold">Category</th>
            <th className="p-6 font-semibold">Quantity</th>
            <th className="p-6 font-semibold">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((item, index) => (
            <motion.tr 
              key={index} 
              whileHover={{ backgroundColor: "#f9fafb" }}
              className="transition-colors"
            >
              <td className="p-6 font-medium text-gray-800">{item.name}</td>
              <td className="p-6 text-gray-500">{item.category}</td>
              <td className="p-6">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                  {item.quantity} units
                </span>
              </td>
              <td className="p-6 text-orange-600 font-bold">
                ${item.price.toFixed(2)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      
      {/* Footer Summary */}
      <div className="bg-orange-50/30 p-6 border-t border-orange-100 flex justify-end">
        <div className="text-right">
            <p className="text-sm text-orange-800/70">Total Amount</p>
            <p className="text-2xl font-bold text-orange-600">
                ${total.toFixed(2)}
            </p>
        </div>
      </div>
    </motion.div>
  );
}