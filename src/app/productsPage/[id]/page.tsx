"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Spinner from '@/components/Spinner';


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
  react: boolean;
}

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [adding, setAdding] = useState(false);
  const [likes, setLikes] = useState(0);
const [isLiked, setIsLiked] = useState(false);

useEffect(() => {
  if (product) {
   setLikes(product.likes ?? 0);
   setIsLiked(product.react ?? false); // স্কিমা অনুযায়ী 'react' মানেই হলো ইউজার লাইক দিয়েছে কি না
  }
}, [product]);

const handleLikeToggle = async () => {
  const newLikedState = !isLiked;
  const increment = newLikedState ? 1 : -1;

  // Optimistic UI Update
  setIsLiked(newLikedState);
  setLikes((prev) => prev + increment);

  try {
    const res = await fetch(`/api/products/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ increment }),
    });

    if (!res.ok) throw new Error("Failed to update");
  } catch (err) {
    // এরর হলে আগের অবস্থায় ফেরত যান
    setIsLiked(!newLikedState);
    setLikes((prev) => prev - increment);
    console.error("Error:", err);
  }
};

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

 if (loading) return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <Spinner />
  </div>
);

if (!product) return (
  <div className="p-20 text-center text-red-500">Product not found!</div>
);


  return (
    <section className="bg-slate-50 min-h-screen py-12 px-6">
     <div className="max-w-6xl mx-auto mb-10 text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
      {product.name}
    </h1>
    <p className="text-slate-500 text-lg">
      Experience the perfect blend of luxury and craftsmanship from FRUNS.
    </p>
  </div>

     <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100 grid md:grid-cols-2 gap-8 items-center"
>
  {/* Image section with controlled size */}
  <div className="w-full">
    <img 
      src={product.imageUrl} 
      alt={product.name} 
      className="w-full h-72 object-cover rounded-xl shadow-md" 
    />
  </div>

  {/* Info section */}
  <div className="flex flex-col">
    <p className="text-xs text-slate-400 mb-2">
      Availability: {product.stockCount > 0 ? `${product.stockCount} in stock` : 'Out of stock'}
    </p>
    <h2 className="text-2xl font-bold text-slate-800 mb-2">{product.name}</h2>
    <div className="text-2xl font-bold text-orange-500 mb-4">${product.price}</div>
    <p className="text-slate-600 text-sm mb-6 line-clamp-3">{product.description}</p>

    <div className="flex items-center gap-3">
      <button
        onClick={handleAddToCart}
        disabled={adding || product.stockCount === 0}
        className="bg-orange-500 text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition disabled:opacity-50"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
      <button 
  onClick={handleLikeToggle}
  className={`border px-4 py-2.5 rounded-lg text-sm transition flex items-center gap-2 ${
    isLiked 
      ? 'border-orange-500 bg-orange-50 text-orange-600' 
      : 'border-slate-200 text-slate-500 hover:bg-slate-100'
  }`}
>
  {isLiked ? '❤️' : '🤍'} {likes}
</button>
    </div>
  </div>
</motion.div>
      {/* Tabs */}
      {/* <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-2xl border border-slate-100">
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
      </div> */}

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