"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Sofa, Info, LayoutDashboard, LogOut, User, PlusCircle, Menu, X, Package, Home, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = "text-gray-600 hover:text-orange-600 font-semibold transition-colors";

  return (
    <nav className="w-full bg-gray-200 border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sofa size={32} className="text-orange-600" />
          <span className="text-3xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Rajdhani, sans-serif' }}>FURNS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={linkClass}>Home</Link>
          <Link href="/products" className={linkClass}>Products</Link>
          <Link href="/About" className={linkClass}>About</Link>
        </div>

        {/* Auth / Profile */}
        <div className="flex items-center gap-4" ref={dropdownRef}>
          {!session ? (
            <div className="hidden md:flex gap-3">
              <Button onPress={() => router.push("/auth/LogIn")} variant="light" className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-all">Login</Button>
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
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-bold text-gray-800 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <div className="py-2">
                      {[ { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
                         { name: "Add Item", path: "/items/add", icon: PlusCircle },
                         { name: "Manage Items", path: "/items/manage", icon: Package }
                      ].map((item) => (
                        <Link key={item.path} href={item.path} onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 rounded-xl transition-colors">
                          <item.icon size={18} className="text-orange-600" /> {item.name}
                        </Link>
                      ))}
                    </div>
                    <button onClick={async () => { await authClient.signOut(); router.push("/"); }} className="mx-4 flex items-center gap-3 bg-red-500 text-white font-bold px-4 py-1 sm:py-2 rounded-xl hover:bg-red-600 transition-all">
                      <LogOut size={18} /> Logout
                    </button>
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
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-48 bg-white z-[70] p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-bold text-orange-600">FURNS</span>
                <button onClick={() => setIsSidebarOpen(false)}><X size={28} /></button>
              </div>
              <div className="flex flex-col gap-6 font-bold text-gray-700">
                <Link href="/" className="flex items-center gap-2 p-2 rounded-xl hover:bg-orange-50" onClick={() => setIsSidebarOpen(false)}><Home size={20}/>Home <ChevronRight size={18}/></Link>
                <Link href="/products" className="flex items-center gap-2  p-2 rounded-xl hover:bg-orange-50" onClick={() => setIsSidebarOpen(false)}><Package size={20}/>Products <ChevronRight size={18}/></Link>
                <Link href="/About" className="flex items-center gap-2  p-2 rounded-xl hover:bg-orange-50" onClick={() => setIsSidebarOpen(false)}> <Info size={20}/>About <ChevronRight size={18}/></Link>
                {!session && (
                  <>
                   <Button onPress={() => router.push("/auth/LogIn")} variant="light" className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-all">Login</Button>
              <Button onPress={() => router.push("/auth/RegisterPage")} className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl hover:bg-orange-600 transition-all">Register</Button>
                  </>
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