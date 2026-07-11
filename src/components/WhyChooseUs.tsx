"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Recycle, Headphones } from "lucide-react";

const features = [
  { icon: <ShieldCheck className="w-10 h-10 text-orange-500" />, title: "Premium Quality", desc: "We use high-grade materials to ensure durability and comfort." },
  { icon: <Truck className="w-10 h-10 text-orange-500" />, title: "Fast Delivery", desc: "Secure and timely delivery right to your doorstep." },
  { icon: <Recycle className="w-10 h-10 text-orange-500" />, title: "Sustainable Design", desc: "Crafted with eco-friendly materials and practices." },
  { icon: <Headphones className="w-10 h-10 text-orange-500" />, title: "24/7 Support", desc: "Dedicated team here to help with your furniture queries." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 } // প্রতিটি কার্ডের মাঝে সুন্দর গ্যাপ
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // নিচে থেকে উপরে উঠবে
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 80, // এটি কমিয়ে বাড়ানো যায় স্মুথনেস কন্ট্রোলের জন্য
      damping: 12,    // এটি স্প্রিংয়ের বাউন্স কমায় বা বাড়ায়
      duration: 0.6 
    } 
  }
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow bg-gray-50 text-center"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;