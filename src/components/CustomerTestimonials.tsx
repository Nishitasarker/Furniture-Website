"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Rahman",
    role: "Interior Designer",
    review: "The premium quality of their furniture is unmatched. The ergonomic design of the sofa I ordered fits perfectly into my client's living room.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    role: "Homeowner",
    review: "Impressed by their fast delivery and sustainable design practices. The smart storage cabinet is both beautiful and highly functional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Nabila Islam",
    role: "Architect",
    review: "Their customer support helped me choose the perfect dining set for my new apartment. The craftsmanship is truly world-class.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

// সেকশন কন্টেইনার অ্যানিমেশন
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15, duration: 0.8 }
  }
};

// স্লাইডার কন্টেন্ট ট্রানজিশন ইফেক্ট
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3 }
  })
};

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = (page % testimonials.length + testimonials.length) % testimonials.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="max-w-4xl mx-auto px-4"
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl min-h-[320px] flex flex-col justify-between items-center text-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${i < testimonials[activeIndex].rating ? "text-orange-500 fill-orange-500" : "text-gray-200"}`} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-lg md:text-xl italic font-medium max-w-2xl mb-8 leading-relaxed">
                "{testimonials[activeIndex].review}"
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4 text-left">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-orange-500/20"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-gray-400 font-medium">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-4 pointer-events-none">
            <button 
              onClick={() => paginate(-1)} 
              className="pointer-events-auto p-2 rounded-full bg-gray-50 border border-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 transition-colors shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => paginate(1)} 
              className="pointer-events-auto p-2 rounded-full bg-gray-50 border border-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 transition-colors shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const newDirection = index > activeIndex ? 1 : -1;
                setPage([index, newDirection]);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-orange-500 w-6" : "bg-gray-300 w-2.5"}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;