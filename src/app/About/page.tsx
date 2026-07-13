"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Palette, Truck, HeartHandshake } from "lucide-react";

const FadeIn = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* 1. Brand Story */}
        <FadeIn>
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The FURNS Legacy</h1>
            <div className="w-24 h-1.5 bg-orange-600 mx-auto rounded-full" />
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Since 2020, FURNS has redefined modern living. We do not just craft furniture; 
              we curate environments that embody comfort, durability, and artistic excellence. 
            </p>
          </div>
        </FadeIn>

        {/* 2. Quality & Craftsmanship */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Superior Craftsmanship</h2>
              <p className="text-gray-600 leading-relaxed">
                We utilize only premium-grade materials, ensuring that every piece stands the test of time. 
                Our artisans combine generational woodworking techniques with precision engineering.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 rounded-3xl overflow-hidden relative group shadow-lg">
                <img src="/FurnitureMaterial.webp" alt="Material" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6"><p className="text-white font-semibold">Premium Raw Materials</p></div>
              </div>
              <div className="h-64 rounded-3xl overflow-hidden relative group shadow-lg mt-8">
                <img src="/Workshop.jpg" alt="Workshop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6"><p className="text-white font-semibold">Precision Workshop</p></div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 3. Behind the Scenes */}
        <section className="space-y-12">
          <FadeIn>
            <div className="text-center space-y-4">
              <h2 className="text-3xl text-gray-800 font-bold">Behind The <span className="text-orange-500">Craft</span></h2>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-6 h-auto">
            {/* Main Workshop Image */}
            <motion.div whileHover={{ scale: 1.02 }} className="md:col-span-2 h-80 rounded-3xl overflow-hidden relative shadow-lg">
              <img src="/furnitureStore.jpg" alt="Workshop" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-8"><p className="text-white font-semibold text-lg">State-of-the-art Workshop</p></div>
            </motion.div>

            {/* Team Image */}
            <motion.div whileHover={{ scale: 1.02 }} className="h-80 rounded-3xl overflow-hidden relative shadow-lg">
              <img src="/TeamGallery.jpg" alt="Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-8"><p className="text-white font-semibold text-lg">Our Skilled Team</p></div>
            </motion.div>

            {/* Detail Focus Image */}
            <motion.div whileHover={{ scale: 1.02 }} className="h-80 rounded-3xl overflow-hidden relative shadow-lg">
              <img src="/DetailFocus.webp" alt="Detail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-8"><p className="text-white font-semibold text-lg">Attention to Detail</p></div>
            </motion.div>

            {/* Driven by Integrity Text Card */}
           <div className="md:col-span-2 h-80 rounded-3xl bg-gray-100 p-10 flex flex-col justify-center border border-gray-200">
  <h3 className="text-2xl font-bold mb-4 text-orange-600">Driven by Integrity</h3>
  <p className="text-gray-600 text-lg leading-relaxed">
    At FURNS, our team blends master craftsmanship with modern design precision. We don't just build furniture; we create art with passion. 
    We value the bond we build with our customers, ensuring every piece is a promise of quality, honesty, and a lasting relationship based on trust.
  </p>
</div>
          </div>
        </section>

        {/* 4. The FURNS Advantage */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: "Bespoke Design", desc: "Tailored to your measurements." },
              { icon: ShieldCheck, title: "Quality Guarantee", desc: "Rigorous quality checks." },
              { icon: Truck, title: "Nationwide Delivery", desc: "Safe, secure shipping." },
              { icon: HeartHandshake, title: "Lifelong Support", desc: "Dedicated assistance." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="p-8 border border-gray-100 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <item.icon className="text-orange-600 mb-6" size={40} />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Footer CTA */}
        {/* Updated Footer CTA & Brand Promise Section - Soft Gray Theme */}
<FadeIn>
  <section className="bg-gray-100 rounded-[2rem] p-12 md:p-20 text-gray-800 text-center overflow-hidden relative border border-gray-200">
    
    {/* Decorative Background Element (Light/Soft Glow) */}
    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-300 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-300 rounded-full blur-3xl" />
    </div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="relative z-10 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">Modern Minimalism, Timeless Elegance</h2>
      
      {/* Updated Details Section with Soft Gray/Orange balance */}
      <div className="grid md:grid-cols-3 gap-8 mb-10 text-left">
        <div className="p-4 border-l-4 border-orange-500 bg-white/50 rounded-r-lg">
          <h4 className="text-orange-600 font-bold mb-2">Our Vision</h4>
          <p className="text-gray-600 text-sm">To curate living spaces that harmonize modern minimalism with the warmth of traditional craftsmanship.</p>
        </div>
        <div className="p-4 border-l-4 border-orange-500 bg-white/50 rounded-r-lg">
          <h4 className="text-orange-600 font-bold mb-2">The Process</h4>
          <p className="text-gray-600 text-sm">From sourcing sustainable timber to hand-finishing every detail, we ensure uncompromising quality.</p>
        </div>
        <div className="p-4 border-l-4 border-orange-500 bg-white/50 rounded-r-lg">
          <h4 className="text-orange-600 font-bold mb-2">Our Promise</h4>
          <p className="text-gray-600 text-sm">We provide not just furniture, but a lifetime commitment to comfort, durability, and aesthetic beauty.</p>
        </div>
      </div>

      <button 
        onClick={() => window.location.href="/productsPage"} 
        className="px-10 py-4 bg-orange-600 text-white hover:bg-orange-700 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-orange-500/20"
      >
        Discover Our Collections
      </button>
    </motion.div>
  </section>
</FadeIn>
      </div>
    </div>
  );
};

export default AboutPage;