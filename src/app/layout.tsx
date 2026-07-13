import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
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
  title: "RecipeHub",
  description: "আপনার পছন্দের সব রেসিপি",
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
      <body className="min-h-full flex flex-col">
        {/* Toaster যোগ করুন যাতে toast.success কাজ করে */}
        {/* <Toaster position="top-right" /> */}
         <CartProvider>  
        {/* Navbar এখানে থাকবে */}
        <Navbar />
        
        {/* মেইন কন্টেন্ট */}
        
        <main className="flex-grow">
          {children}
        </main>
        </CartProvider>
        <Footer/>
      </body>
    </html>
  );
}