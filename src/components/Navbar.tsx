"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Sofa } from 'lucide-react';
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-20 w-full" />;
  if (pathname.toLowerCase().includes('dashboard')) return null;

  // কমন স্টাইল: সাধারণ অবস্থায় টেক্সট ধূসর, হোভার করলে অরেঞ্জ
  const linkClass = "text-gray-600 transition-colors duration-200 hover:text-orange-500 font-medium";

  return (
    <nav className="w-full bg-gray-200 border-b border-gray-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sofa size={32} className="text-orange-700" />
          <span className="text-3xl font-bold text-gray-800 uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
  FURNS
</span>        </Link>

        {/* Menu Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={linkClass}>Home</Link>
          <Link href="/products" className={linkClass}>Products</Link>
          
          {session && (
            <>
              <Link href="/dashboard" className={linkClass}>Dashboard</Link>
              <Link href="/items/add" className={linkClass}>Add Item</Link>
              <Link href="/items/manage" className={linkClass}>Manage Items</Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!session ? (
            <>
              <Button onPress={() => router.push("/auth/LogIn")} variant="light" className="text-gray-600 hover:text-orange-500">Login</Button>
              <Button onPress={() => router.push("/auth/RegisterPage")} className="bg-orange-500 text-white hover:bg-orange-600">Register</Button>
            </>
          ) : (
            <Button onPress={async () => { await authClient.signOut(); toast.success("Logged out!"); router.push("/"); }} variant="flat" className="bg-gray-300 hover:bg-orange-500 hover:text-white">
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;