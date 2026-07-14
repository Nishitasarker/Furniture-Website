"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FeaturedSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    // ডেটা ফেচিং শুরু হওয়ার সময় loading true থাকবে
    fetch('/api/products/featured')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false); // ডেটা চলে আসলে loading false করে দিবো
      })
      .catch(() => setLoading(false)); // এরর হ্যান্ডলিং
  }, []);




 return (
    <section className="py-16 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Featured <span className="text-orange-500">Collection</span>
        </h2>
        
        {/* লোডিং অবস্থায় spinner দেখাবে */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          /* ডেটা চলে আসলে গ্রিডটি দেখাবে */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p: any) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
              >
                <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-slate-800">{p.name}</h3>
                <p className="text-orange-500 font-bold mb-2">${p.price}</p>
                <div className="flex justify-between items-center text-sm text-slate-400">
                  <span>❤️ {p.likes}</span>
                  <Link href={`/productsPage/${p.id}`} className="text-orange-500 font-semibold hover:underline">
                    View
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}