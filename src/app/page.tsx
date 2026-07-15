"use client";
import { Variants } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategorySection from "@/components/CategorySection";
import FeaturedSection from "@/components/FeaturedSection";
import {FlashSale} from "@/components/FlashSale";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/CustomerTestimonials"
import BlogSection from "@/components/InteriorDesignTips";
import NewsletterSocial from "@/components/NewsletterSocial";
import Link from "next/link";

const slides = [
  { id: 1, title: "Mastercrafted Comfort", desc: "Experience the perfect blend of ergonomic design and luxurious aesthetics tailored for your home.", image: "/sofa.jpg" },
  { id: 2, title: "Sanctuary of Serenity", desc: "Transform your bedroom into a peaceful retreat with our exclusive, artisan-curated furniture collections.", image: "/bed.jpg" },
  { id: 3, title: "Elevated Dining Experience", desc: "Create unforgettable moments with high-end dining sets designed for both elegance and durability.", image: "/dining.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
    },
  },
};


const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, 
  transition: { duration: 0.6, ease: "easeOut" as const} },
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <>
    <section className="relative w-full h-[480px] overflow-hidden bg-gray-900 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        />
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-5 top-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-orange-500 transition-all text-white"><ChevronLeft size={30} /></button>
      <button onClick={nextSlide} className="absolute right-5 top-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-orange-500 transition-all text-white"><ChevronRight size={30} /></button>

      <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
        <motion.div 
          key={slides[current].id} 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          {/* Title */}
          <motion.h1 variants={childVariants} className="text-5xl md:text-7xl font-bold mb-6">
            {slides[current].title}
          </motion.h1>

          {/* Description */}
          <motion.p variants={childVariants} className="max-w-xl mx-auto text-gray-200 mb-8 text-lg">
            {slides[current].desc}
          </motion.p>

          {/* Button */}
          <motion.div variants={childVariants}>
            <Link href="/productsPage">
             <Button className="bg-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition-all">
      Shop Now</Button> </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
    <CategorySection></CategorySection>
    <FeaturedSection></FeaturedSection>
    <FlashSale></FlashSale>
    <WhyChooseUs></WhyChooseUs>
    <Testimonials></Testimonials>
    <BlogSection></BlogSection>
    <NewsletterSocial></NewsletterSocial>
    </>
  );
};

export default HeroSection;