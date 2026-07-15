import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return <div className="p-10 text-center text-red-500">Please log in to view your profile.</div>;
  }

  // MongoDB থেকে আসা ডাটা অনুযায়ী ডাটা স্ট্রাকচার
  const userData = {
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || "",
    createdAt: session.user.createdAt || new Date().toISOString(),
  };

  return (
    <div className=" mx-auto p-6">
      <div className="mb-8 border-l-4 border-orange-600 pl-4">
    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
      My Profile <span className="text-orange-600">Furns</span>
    </h1>
    <p className="text-gray-500 mt-2 text-lg">
      Manage your personal space and account preferences.
    </p>
  </div>
  
  <ProfileForm initialData={userData} />
</div>
  );
}