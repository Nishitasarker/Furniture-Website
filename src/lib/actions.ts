'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function updateProfile(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  
  try {
    // ১. headers() একবার কল করুন
    const headerList = await headers();
    
    // ২. সেশন ভ্যালিডেশন
    const session = await auth.api.getSession({ headers: headerList });
    if (!session?.user?.id) return { success: false, message: "Unauthorized" };

    // ৩. আপডেট অপারেশন
    await auth.api.updateUser({
      headers: headerList,
      body: { name: name },
    });

    revalidatePath('/dashboard/profile');
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, message: "Failed to update profile." };
  }
}