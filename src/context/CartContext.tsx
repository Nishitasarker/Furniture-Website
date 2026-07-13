"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  loading: boolean;
  addToCart: (product: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (productId: string, removeAll?: boolean) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    setItems(data.items || []);
  };

  const removeFromCart = async (productId: string, removeAll: boolean = false) => {
    const res = await fetch(`/api/cart/${productId}${removeAll ? '?all=true' : ''}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    setItems(data.items || []);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, cartCount, loading, addToCart, removeFromCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};