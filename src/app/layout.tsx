import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FURNS | Premium Furniture Store",
  description: "Elevate your living space with FURNS. Modern, hand-crafted furniture for your home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Applying bg-slate-50 here ensures the entire site has your light gray base */}
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <CartProvider>
          <Toaster position="top-right" />
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}