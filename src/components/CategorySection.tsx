"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Home Decor", image: "/Home-Decor.jpg", count: "35+ Items" },
  { name: "Outdoor Living", image: "/Outdoor.jpg", count: "12 Items" },
  { name: "Smart Storage", image: "/Smart-Storage.jpg", count: "20 Items" },
  { name: "Kids Zone", image: "/kids.jpg", count: "15 Items" },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
            >
              {/* Category Image */}
              <div 
                className="h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="text-sm opacity-80">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;