"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Package, User, ShoppingBag, Home } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Overview', path: '/dashboard', icon: Package },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'My Orders', path: '/dashboard/orders', icon: ShoppingBag },
  ];

  return (
    <>
      {/* মোবাইল টগল বাটন */}
      <button className="md:hidden p-2 text-orange-600" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      {/* সাইডবার কন্টেন্ট */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 md:shadow-none md:flex md:flex-col md:h-full`}>
        
        {/* মোবাইল ড্রয়ার ক্লোজ বাটন */}
        <div className="md:hidden p-4 flex justify-end">
          <button onClick={() => setIsOpen(false)}><X size={24} className="text-gray-500" /></button>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {links.map((l) => (
            <Link key={l.path} href={l.path} onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${pathname === l.path ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <l.icon size={20} /> {l.name}
            </Link>
          ))}
        </nav>

        {/* Browse to Home বাটন (সব সময় নিচে থাকবে) */}
        <div className="border-t border-gray-100 p-4">
          <Link href="/" className="flex items-center gap-3 p-3 text-orange-600 font-bold hover:bg-orange-50 rounded-xl transition-all">
            <Home size={20} /> Browse to Home
          </Link>
        </div>
      </div>

      {/* মোবাইল ওভারলে */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} />}
    </>
  );
}