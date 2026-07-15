"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageUrl = formData.get('image') as string;

    const data = {
      id: `furns_${Date.now()}`,
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseFloat(formData.get('price') as string),
      // ইমেজ না থাকলে একটি ডিফল্ট ইমেজ বসবে
      imageUrl: imageUrl || 'https://i.ibb.co.com/VWxBKpMC/photo-1616486338812-3dadae4b4ace.jpg',
      description: formData.get('description'),
      isFeatured: formData.get('isFeatured') === 'on',
      stockCount: parseInt(formData.get('stockCount') as string),
      likes: 0,
      react: false,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(t => t !== ""),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Product added successfully!');
        e.currentTarget.reset();
      } else {
        toast.error(result.error || 'Failed to add product');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen py-12 px-6 flex flex-col items-center">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="max-w-lg w-full mb-8 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-2">
          Add <span className="text-orange-600">New Furniture</span>
        </h1>
        <p className="text-slate-500 max-w-lg">
          Expand your premium catalog by adding new hand-crafted pieces. 
          Fill in the details below to publish your latest collection.
        </p>
      </div>
      
      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg border border-slate-100"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-orange-500 pl-4">
          Product Details
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-slate-600">Product Name</label>
            <input name="name" placeholder="e.g., Nordic Oak Chair" type="text" className="w-full mt-1 p-3 bg-slate-50 text-slate-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">Category</label>
              <select name="category" defaultValue="" className="w-full mt-1 p-3 bg-slate-50 text-slate-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none" required>
                <option value="" disabled>Select a category</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Outdoor Living">Outdoor Living</option>
                <option value="Smart Storage">Smart Storage</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-900">Price ($)</label>
              <input name="price" placeholder="0.00" type="number" step="0.01" className="w-full mt-1 p-3 bg-slate-50 text-slate-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required />
            </div>
          </div>

          {/* Image URL (Optional) */}
          <div>
            <label className="text-sm font-semibold text-slate-600">Image URL <span className='text-slate-400 font-normal'>(Optional)</span></label>
            <input name="image" placeholder="https://example.com/product-image.jpg" type="url" className="w-full mt-1 p-3 text-slate-700 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-slate-600">Description</label>
            <textarea name="description" placeholder="Describe the materials, comfort, and design..." className="w-full mt-1 text-slate-700 p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-20" required />
          </div>

          {/* Stock & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">Stock Count</label>
              <input name="stockCount" placeholder="e.g., 20" type="number" className="w-full mt-1 p-3 bg-slate-50 text-slate-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" required />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600">Tags</label>
              <input name="tags" type="text" placeholder="e.g., modern, wood" className="w-full mt-1 p-3 bg-slate-50 text-slate-700 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all mt-4"
          >
            {loading ? "Processing..." : "Add to Furns Collection"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddProductForm;