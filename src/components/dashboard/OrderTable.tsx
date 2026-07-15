'use client';

import { motion } from 'framer-motion';



export default function OrderTable({ orders }: { orders: any[] }) {

  if (orders.length === 0) {

    return <p className="text-gray-500">No items in your cart/orders yet.</p>;

  }



  return (

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"

    >

      <table className="w-full text-left">

        <thead className="bg-gray-50 text-gray-500 text-sm">

          <tr>

            <th className="p-4">Item Name</th>

            <th className="p-4">Category</th>

            <th className="p-4">Quantity</th>

            <th className="p-4">Price</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((item, index) => (

            <tr key={index} className="border-t border-gray-100">

              <td className="p-4 font-medium">{item.name}</td>

              <td className="p-4 text-gray-600">{item.category}</td>

              <td className="p-4">{item.quantity}</td>

              <td className="p-4 text-orange-600 font-bold">${item.price}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </motion.div>

  );
}