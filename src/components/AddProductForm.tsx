"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      id: `furns_${Date.now()}`,
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price') as string),
      imageUrl: formData.get('image'),
      description: formData.get('description'),
      isFeatured: formData.get('isFeatured') === 'on',
      stockCount: parseInt(formData.get('stockCount') as string),
      likes: 0,
      react: false,
      tags: (formData.get('tags') as string)?.split(',').map((t) => t.trim()) || [],
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Product added to Furns!');
        // ফর্ম সফলভাবে সাবমিট হলে সব ফিল্ড পরিষ্কার হবে
        form.reset(); 
      } else {
        toast.error(result.error || 'Failed to add product');
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen py-12 px-6 flex flex-col items-center">
      <Toaster position="top-right" />

      <div className="max-w-lg w-full mb-8 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-2">FURNS Admin</h1>
        <p className="text-slate-500">
          Curating premium quality furniture for modern living. 
          Use this panel to expand our exclusive catalog.
        </p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg border border-slate-100"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-orange-500 pl-4">
          Add New Product
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-600">Product Name</label>
            <input name="name" placeholder="e.g., Nordic Oak Chair" type="text" className="w-full mt-1 p-3 bg-slate-50 text-gray-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">Category</label>
              <select name="category" defaultValue="" className="w-full mt-1 p-3 bg-slate-50 text-gray-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required>
                <option value="" disabled>Select a category</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Outdoor Living">Outdoor Living</option>
                <option value="Smart Storage">Smart Storage</option>
                <option value="Kids Zone">Kids Zone</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">Price ($)</label>
              <input name="price" placeholder="0.00" type="number" step="0.01" className="w-full mt-1 p-3 bg-slate-50 text-gray-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">Image URL</label>
            <input name="image" placeholder="https://example.com/product-image.jpg" type="url" className="w-full mt-1 p-3 text-gray-700 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">Description</label>
            <textarea name="description" placeholder="Describe the product..." className="w-full mt-1 text-gray-700 p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-20" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">Stock Count</label>
              <input name="stockCount" placeholder="e.g., 20" type="number" className="w-full mt-1 p-3 bg-slate-50 text-gray-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">Tags (comma separated)</label>
              <input name="tags" type="text" placeholder="e.g., minimalist, wood" className="w-full mt-1 p-3 bg-slate-50 text-gray-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all disabled:bg-orange-300"
          >
            {loading ? "Processing..." : "Add to Furns Collection"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddProductForm;