"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  category: string;
  stockCount: number;
  tags: string[];
  likes: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);

        // একই category এর related product আনা
        if (data?.category) {
          fetch(`/api/products`)
            .then((res) => res.json())
            .then((all: Product[]) => {
              const related = all
                .filter((p) => p.category === data.category && p.id !== data.id)
                .slice(0, 4);
              setRelatedProducts(related);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-slate-500">Loading details...</div>;
  if (!product) return <div className="p-20 text-center text-red-500">Product not found!</div>;

  return (
    <section className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto mb-8">
        <p className="text-sm text-slate-400 mb-2">Home / Product / {product.name}</p>
        <h1 className="text-3xl font-bold text-slate-800">{product.name}</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100 grid md:grid-cols-2 gap-12"
      >
        <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-xl shadow-md" />

        <div className="flex flex-col">
          <p className="text-sm text-slate-500 mb-1">
            Availability: {product.stockCount > 0 ? `${product.stockCount} in stock` : 'Out of stock'}
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{product.name}</h2>
          <div className="text-3xl font-bold text-orange-500 mb-6">${product.price}</div>
          <p className="text-slate-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={adding || product.stockCount === 0}
              className="bg-orange-500 text-white px-10 py-3 rounded-lg font-bold hover:bg-orange-600 transition disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>
            <button className="border border-slate-300 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100">
              ❤️ {product.likes}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-slate-100">
        <div className="flex gap-8 border-b border-slate-200 mb-6">
          {['Description', 'Additional Info', 'Reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-3 font-semibold transition ${
                activeTab === tab.toLowerCase()
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-slate-600"
          >
            {product.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <motion.div
                key={rp.id}
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
              >
                <img src={rp.imageUrl} alt={rp.name} className="w-full h-40 object-cover rounded-xl mb-3" />
                <h4 className="font-bold text-slate-800 mb-1">{rp.name}</h4>
                <p className="text-orange-500 font-bold mb-3">${rp.price}</p>
                <Link href={`/productsPage/${rp.id}`}>
                  <button className="w-full bg-slate-100 hover:bg-orange-500 hover:text-white transition py-2 rounded-lg font-semibold text-slate-700">
                    View Details
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;