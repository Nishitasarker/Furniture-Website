"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ফিল্টার ও কন্ট্রোল স্টেট
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  // ফিল্টারিং ও সর্টিং লজিক
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => 
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    
    return filtered;
  }, [products, search, category, sortBy]);

  const paginatedData = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Our Collection</h1>

        {/* সার্চ ও ফিল্টার প্যানেল */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-gray-500 mb-8 flex flex-wrap gap-4 items-center">
          <input 
            type="text" placeholder="Search furniture..." className="flex-grow p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <select onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }} className="p-3 bg-gray-50 rounded-xl outline-none border-none focus:ring-2 focus:ring-orange-500">
  <option value="All">All Categories</option>
  <option value="Home Decor">Home Decor</option>
  <option value="Outdoor Living">Outdoor Living</option>
  <option value="Smart Storage">Smart Storage</option>
  <option value="Kids Zone">Kids Zone</option>
</select>
          <select onChange={(e) => setSortBy(e.target.value)} className="p-3 bg-gray-50 rounded-xl outline-none">
            <option value="newest">Sort: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* প্রোডাক্ট গ্রিড */}
        <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f1f5f9">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loading ? [...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100">
                <Skeleton height={200} className="rounded-2xl mb-4" />
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={15} width="60%" className="mb-4" />
                <Skeleton height={45} className="rounded-xl" />
              </div>
            )) : (
              <AnimatePresence>
                {paginatedData.map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    className="bg-white flex flex-col p-4 rounded-3xl shadow-sm border border-slate-100"
                  >
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-2xl mb-4" />
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{product.name}</h3>
                      <p className="text-slate-500 text-xs mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-orange-500 font-bold text-lg">${product.price}</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-600">{product.category}</span>
                      </div>
                    </div>
                    <button className="w-full bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-500 transition-colors">
                      View Details
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </SkeletonTheme>

        {/* পেজিনেশন */}
       <div className="flex justify-center mt-10 gap-2 items-center">
  {/* Left Arrow */}
  <button 
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="p-2 rounded-lg text-gray-500 bg-white border border-slate-200 disabled:opacity-50 hover:bg-slate-100 transition"
  >
    <ChevronLeft size={20} />
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }).map((_, i) => (
    <button 
      key={i} 
      onClick={() => setCurrentPage(i + 1)} 
      className={`px-4 py-2 rounded-lg font-bold transition ${
        currentPage === i + 1 
          ? 'bg-orange-500 text-white' 
          : 'bg-white text-slate-600 hover:bg-slate-200'
      }`}
    >
      {i + 1}
    </button>
  ))}

  {/* Right Arrow */}
  <button 
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="p-2 rounded-lg text-gray-500 bg-white border border-slate-200 disabled:opacity-50 hover:bg-slate-100 transition"
  >
    <ChevronRight size={20} />
  </button>
</div>
      </div>
    </section>
  );
};

export default ProductPage;