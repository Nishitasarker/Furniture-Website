"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { useCart } from "@/context/CartContext";

export const FlashSale = () => {
  const { data: session } = useSession();
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const email = session?.user?.email || "guest";
    fetch(`/api/products/flash-sale?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      });
  }, [session]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  
  const displayedProducts = products.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Flash Sale</h2>
            <p className="text-gray-500">Limited time offer: Get up to <span className="font-bold text-orange-500">40% OFF</span></p>
          </div>
          <button 
            onClick={nextSlide}
            className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition shadow-lg"
          >
            ➔
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {displayedProducts.map((item) => (
              <motion.div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-orange-300 transition"
              >
                <div className="relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-56 object-cover rounded-lg" />
                  <span className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    -40% OFF
                  </span>
                </div>
                <h3 className="text-lg font-semibold mt-4 text-gray-800">{item.name}</h3>
                
                <div className="flex justify-between items-center mt-2">
                  <p className="text-orange-600 font-bold text-xl">${(item.price * 0.6).toFixed(2)}</p>
                  
                  {/* বাটনটি এখন map এর ভিতরে এবং 'item' ভেরিয়েবলটি ব্যবহার করছে */}
                  <button 
                    onClick={() => {
                      const discountedPrice = (item.price * 0.6);
                      addToCart({ 
                        productId: item.id || item._id, 
                        name: item.name,
                        price: parseFloat(discountedPrice.toFixed(2)),
                        category: item.category,
                        imageUrl: item.imageUrl 
                      });
                      alert("Added to cart!");
                    }}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition"
                  >
                    Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};