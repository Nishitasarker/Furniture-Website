"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react"; // শুধুমাত্র লুসিড থেকে Mail ব্যবহার করুন
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const NewsletterSocial = () => {
  const [status, setStatus] = useState("idle");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      alert("Thank you for subscribing!");
      setStatus("idle");
    }, 1000);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Inspired</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest interior design trends and exclusive offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-grow p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              type="submit"
              disabled={status === "loading"}
              className="bg-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition-all"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Connect With Us</h2>
          <p className="text-gray-600 mb-8">
            Follow our social media channels to see our latest projects and styling tips.
          </p>
          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            {[
              { icon: <FaFacebook size={24} />, label: "Facebook" },
              { icon: <FaInstagram size={24} />, label: "Instagram" },
              { icon: <FaLinkedin size={24} />, label: "LinkedIn" },
              { icon: <FaWhatsapp size={24} />, label: "WhatsApp" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -5, color: "#f97316" }}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-700 hover:text-orange-500 hover:border-orange-500 transition-all"
              >
                {social.icon}
                <span className="font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSocial;