import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "").replace(/\/$/, ""),
});


// এখান থেকেই সব এক্সপোর্ট করুন
export const { signIn, signUp, useSession } = authClient;