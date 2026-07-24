"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Card, Form, Input, Label, TextField, Description } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Custom Message State (Toastify-এর বদলে)
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      setErrorMessage("Google authentication service failed.");
    }
  };

  // Form Submit Handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = (formData.get("image") as string) || "/user.png";

    try {
      await authClient.signUp.email({
        name,
        email,
        password,
        image,
      }, {
        onSuccess: () => { 
          setLoading(false);
          // ওয়েবসাইটের ভেতরের Success Message দেখাবে
          setSuccessMessage("Account created successfully! Redirecting...");
          
          setTimeout(() => {
             router.push("/");
             router.refresh();
          }, 1500);
        },
        onError: (ctx) => {
          setLoading(false);
          // ওয়েবসাইটের ভেতরের Error Message দেখাবে
          setErrorMessage(ctx.error.message || "Registration failed! Please try again.");
        }
      });
    } catch (err) {
      setLoading(false);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Join Our Design Community</h1>
          <p className="text-sm text-gray-500">Explore premium furniture and save your favorite designs.</p>
        </div>

        {/* Website Inline Success Message Box */}
        {successMessage && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in duration-300">
            <FaCheckCircle className="text-emerald-500 text-lg flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Website Inline Error Message Box */}
        {errorMessage && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in duration-300">
            <FaExclamationCircle className="text-red-500 text-lg flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Form className="flex flex-col gap-4" onSubmit={onSubmit} autoComplete="off">
          
          <TextField isRequired name="name" className="w-full">
            <Label className="text-sm font-semibold text-gray-700">Full Name</Label>
            <Input name="name" autoComplete="off" placeholder="John Doe" className="w-full mt-1 px-3 py-2 border border-gray-200 text-gray-900 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
          </TextField>

          <TextField name="image" className="w-full">
            <Label className="text-sm font-semibold text-gray-700">Photo URL (Optional)</Label>
            <Input name="image" autoComplete="off" placeholder="https://example.com/photo.jpg" className="w-full mt-1 px-3 py-2 border border-gray-200 text-gray-900 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
          </TextField>

          <TextField isRequired name="email" className="w-full">
            <Label className="text-sm font-semibold text-gray-700">Email</Label>
            <Input name="email" autoComplete="off" type="email" placeholder="example@mail.com" className="w-full mt-1 px-3 py-2 border border-gray-200 text-gray-900 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
          </TextField>

          <TextField isRequired name="password" className="w-full">
            <Label className="text-sm font-semibold text-gray-900">Password</Label>
            <div className="relative mt-1">
              <Input name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Enter password" className="w-full px-3 py-2 pr-11 border border-gray-200 text-gray-900 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <Description className="text-[11px] text-gray-400 mt-1">Must be at least 6 characters.</Description>
          </TextField>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </Form>

        <div className="text-center text-sm text-gray-600">
          Already have an account? <Link href="/auth/LogIn" className="text-red-600 font-bold hover:underline">Log in here</Link>
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-400 text-xs uppercase">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button
          type="button" 
          onClick={handleGoogleLogin}
          className="w-full py-3 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm text-red-700 bg-white border-2 border-red-100 hover:bg-red-50 transition-all"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>
      </Card>
    </div>
  );
};

export default RegisterPage;