import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : "https://e-commerce-app-seven-rho-12.vercel.app"});

// এখান থেকেই সব এক্সপোর্ট করুন
export const { signIn, signUp, useSession } = authClient;