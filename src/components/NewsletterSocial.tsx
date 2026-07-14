"use client";
import { motion } from 'framer-motion';

export default function CustomDesignSection() {
  const phoneNumber = "8801859384536";
  const message = "Hi, I'm interested in a custom furniture design consultation.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section className="py-20 bg-slate-50 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Headline outside the card */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
            Create Your Dream Furniture
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Clean, Professional Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Tailored to Your Vision
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Looking for bespoke furniture tailored to your home dimensions and style? Our expert craftsmen use premium materials to bring your unique vision to life.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-slate-700">
                <span className="text-orange-500 mr-2">✓</span> Premium Wood Quality
              </div>
              <div className="flex items-center text-slate-700">
                <span className="text-orange-500 mr-2">✓</span> Custom Dimensions
              </div>
              <div className="flex items-center text-slate-700">
                <span className="text-orange-500 mr-2">✓</span> Expert Craftsmanship
              </div>
              <div className="flex items-center text-slate-700">
                <span className="text-orange-500 mr-2">✓</span> Tailored Finishes
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="w-full md:w-auto bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center min-w-[280px]">
            <h4 className="text-lg font-bold text-slate-800 mb-2">Need Assistance?</h4>
            <p className="text-slate-500 text-sm mb-6">Let's discuss your project.</p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md"
            >
              Contact on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}