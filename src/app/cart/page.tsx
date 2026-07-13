"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { items, addToCart, removeFromCart, loading } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <div className="p-20 text-center text-slate-500">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
        <ShoppingBag size={64} className="text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Add some products to see them here.</p>
        <Link href="/productsPage" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Manage Cart Items</h1>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex items-center gap-4 p-5 border-b border-slate-100 last:border-none"
              >
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />

                <div className="flex-grow">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">{item.category}</p>
                  <p className="text-orange-500 font-bold">${item.price}</p>
                </div>

                {/* Quantity control */}
                <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-2 py-1">
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1 hover:bg-slate-200 rounded-md text-slate-600"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addToCart({
                      productId: item.productId,
                      name: item.name,
                      price: item.price,
                      category: item.category,
                      imageUrl: item.imageUrl,
                    })}
                    className="p-1 hover:bg-slate-200 rounded-md text-slate-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <p className="w-20 text-right font-bold text-slate-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* সম্পূর্ণ remove (quantity যাই থাকুক) */}
                <button
                  onClick={() => removeFromCart(item.productId, true)}
                  className="text-slate-400 hover:text-red-500 p-2"
                  title="Remove item completely"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-sm">Total ({items.reduce((s, i) => s + i.quantity, 0)} items)</p>
            <p className="text-2xl font-black text-slate-900">${total.toFixed(2)}</p>
          </div>
          <button className="bg-orange-500 text-white px-10 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;