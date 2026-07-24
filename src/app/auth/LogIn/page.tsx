"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

import {
  Card,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from '@/lib/auth-client';

const LogInPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          // ১ সেকেন্ড পরেই autoClose করার অপশন যোগ করা হয়েছে
          toast.success("Logged in successfully!", {
            autoClose: 1000,
          });

          // টোস্ট শেষ হওয়ার সাথে সাথে ১ সেকেন্ড পর নেভিগেট হবে
          setTimeout(() => {
            router.push('/');
            router.refresh();
          }, 1000);
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "Invalid credentials.", {
            autoClose: 2000,
          });
        }
      }
    });
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      {/* অটো ক্লোজ গ্লোবালি ১ সেকেন্ড ফিক্স করে দেওয়া হলো */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
      
      <Card className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Log In</h1>
          <p className="text-sm text-gray-500">Welcome back to your home for fine furniture.</p>
        </div>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="email" type="email" className="w-full">
            <Label className="text-sm font-medium text-gray-800">Email</Label>
            <Input name="email" autoComplete="off" placeholder="john@example.com" className="w-full mt-1 p-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
          </TextField>

          <TextField isRequired name="password" type={showPassword ? "text" : "password"} className="w-full">
            <Label className="text-sm font-medium text-gray-800">Password</Label>
            <div className="relative mt-1">
              <Input name="password" autoComplete="new-password" 
                placeholder="Enter password" className="w-full p-2 pr-10 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </TextField>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </Form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account? <Link href="/auth/RegisterPage" className="text-orange-600 font-bold hover:underline">Register here</Link>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-400 uppercase">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700"
        >
          <FcGoogle /> Login with Google
        </button>
      </Card>
    </div>
  );
};

export default LogInPage;