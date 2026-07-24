"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Sofa, Info, LayoutDashboard, LogOut, User, PlusCircle, Menu, X, Package, Home, ChevronRight, ShoppingCart, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useCart } from '@/context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Cart Icon Component
const CartIcon = ({ onProtectedNavigate }: { onProtectedNavigate: (path: string) => void }) => {
  const { cartCount } = useCart();
  return (
    <button onClick={() => onProtectedNavigate("/cart")} className="relative p-2 inline-block">
      <ShoppingCart size={26} className="text-gray-700 hover:text-orange-600 transition-colors" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );
};

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  // Cart বা অন্য সুরক্ষিত লিঙ্কে ক্লিক করলে Toastify ও Redirect হ্যান্ডেল করার ফাংশন
  const handleProtectedNavigation = (path: string) => {
    if (!session) {
      toast.warning("Please login first!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/auth/LogIn");
      }, 1500);
    } else {
      router.push(path);
    }
  };

  const getDesktopLinkClass = (path: string) => 
    `font-semibold transition-colors pb-1 ${pathname === path ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:text-orange-600"}`;
    
  const getMobileLinkClass = (path: string) => 
    `flex items-center gap-2 p-2 rounded-xl transition-colors ${pathname === path ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-orange-50"}`;

  const handleLogout = async () => {
    await authClient.signOut();
    setIsSidebarOpen(false);
    setIsDropdownOpen(false);
    toast.info("Logged out successfully", { position: "top-right", autoClose: 2000 });
    router.push("/");
  };

  return (
    <nav className="w-full bg-gray-200 border-b border-gray-200 sticky top-0 z-50">
      {/* Toastify Container */}
      <ToastContainer />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-20">
        <Link href="/" className="flex items-center gap-2">
          <Sofa size={32} className="text-orange-600" />
          <span className="text-3xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Rajdhani, sans-serif' }}>FURNS</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={getDesktopLinkClass("/")}>Home</Link>
          <Link href="/productsPage" className={getDesktopLinkClass("/productsPage")}>Products</Link>
          <Link href="/About" className={getDesktopLinkClass("/About")}>About</Link>
        </div>

        <div className="flex items-center gap-4" ref={dropdownRef}>
          {/* Cart Icon */}
          <CartIcon onProtectedNavigate={handleProtectedNavigation} />

          {!session ? (
            <div className="hidden md:flex gap-3">
              <Button onPress={() => router.push("/auth/LogIn")} variant="ghost" className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-all">Login</Button>
              <Button onPress={() => router.push("/auth/RegisterPage")} className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-all">Register</Button>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-all">
                <span className="font-semibold text-gray-700 hidden sm:block text-sm">Hi, {session.user?.name}!</span>
                <div className="w-9 h-9 rounded-full bg-orange-200 border-2 border-orange-400 overflow-hidden">
                  {session.user?.image ? <Image src={session.user.image} width={36} height={36} alt="User" /> : <User className="w-full h-full p-1.5 text-orange-700" />}
                </div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50"
                  >
                    <div className="px-4 py-3 bg-gray-50 rounded-xl mb-1">
                      <p className="font-bold text-gray-800 text-sm truncate">{session.user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <div className="py-2">
                      {[ 
                        { name: "Dashboard", path: "/dashboard" },
                        { name: "Add Item", path: "/add-product" },
                      ].map((item) => {
                         const isActive = pathname === item.path;
                         return (
                            <Link key={item.path} href={item.path} onClick={() => setIsDropdownOpen(false)} 
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${isActive ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700 hover:bg-orange-50"}`}>
                              {item.name}
                            </Link>
                         );
                      })}
                      {/* Manage Items / Cart Icon in Dropdown */}
                      <button 
                        onClick={() => { setIsDropdownOpen(false); handleProtectedNavigation("/cart"); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-gray-700 hover:bg-orange-50 text-left"
                      >
                        <Package size={18} className="text-gray-400" /> Manage Items
                      </button>
                    </div>
                    <div className="border-t border-gray-100 pt-2">
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 text-red-500 hover:bg-red-50 font-bold px-4 py-2.5 rounded-xl transition-all">
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsSidebarOpen(true)}><Menu size={28} /></button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-64 bg-white z-[70] p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-2xl font-bold text-orange-600">FURNS</span>
                  <button onClick={() => setIsSidebarOpen(false)}><X size={28} /></button>
                </div>

                {/* Profile Badge in Sidebar if Logged in */}
                {session && (
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl mb-6">
                    <div className="w-10 h-10 rounded-full bg-orange-200 border border-orange-400 overflow-hidden flex-shrink-0">
                      {session.user?.image ? <Image src={session.user.image} width={40} height={40} alt="User" /> : <User className="w-full h-full p-2 text-orange-700" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-gray-800 text-sm truncate">{session.user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 font-semibold">
                  <Link href="/" className={getMobileLinkClass("/")} onClick={() => setIsSidebarOpen(false)}><Home size={20}/>Home <ChevronRight size={18} className="ml-auto"/></Link>
                  <Link href="/productsPage" className={getMobileLinkClass("/productsPage")} onClick={() => setIsSidebarOpen(false)}><Package size={20}/>Products <ChevronRight size={18} className="ml-auto"/></Link>
                  
                  {/* Cart Button with Protected Navigation */}
                  <button 
                    onClick={() => { setIsSidebarOpen(false); handleProtectedNavigation("/cart"); }} 
                    className={getMobileLinkClass("/cart") + " w-full text-left"}
                  >
                    <ShoppingCart size={20}/>Cart <ChevronRight size={18} className="ml-auto"/>
                  </button>

                  <Link href="/About" className={getMobileLinkClass("/About")} onClick={() => setIsSidebarOpen(false)}><Info size={20}/>About <ChevronRight size={18} className="ml-auto"/></Link>
                  
                  {session && (
                    <>
                      <div className="my-2 border-t border-gray-100" />
                      <Link href="/dashboard" className={getMobileLinkClass("/dashboard")} onClick={() => setIsSidebarOpen(false)}><LayoutDashboard size={20}/>Dashboard <ChevronRight size={18} className="ml-auto"/></Link>
                      <Link href="/add-product" className={getMobileLinkClass("/add-product")} onClick={() => setIsSidebarOpen(false)}><PlusCircle size={20}/>Add Item <ChevronRight size={18} className="ml-auto"/></Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Sidebar Auth Buttons */}
              <div className="pt-6 border-t border-gray-100">
                {!session ? (
                  <div className="flex flex-col gap-2">
                    <Button 
                      onPress={() => { setIsSidebarOpen(false); router.push("/auth/LogIn"); }} 
                      className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn size={18} /> Login
                    </Button>
                    <Button 
                      onPress={() => { setIsSidebarOpen(false); router.push("/auth/RegisterPage"); }} 
                      variant="ghost"
                      className="w-full bg-orange-100 text-orange-600 font-bold py-2.5 rounded-xl hover:bg-orange-200 transition-all flex items-center justify-center gap-2"
                    >
                      <UserPlus size={18} /> Register
                    </Button>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2.5 rounded-xl transition-all"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;