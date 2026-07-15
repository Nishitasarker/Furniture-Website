'use client';

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { updateProfile } from '@/lib/actions';

export default function ProfileForm({ initialData }: { initialData: any }) {
  const [state, action, isPending] = useActionState(updateProfile, null);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm"
    >
      {/* Header Info Card */}
      <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <img src={initialData.image} alt="Profile" className="w-16 h-16 rounded-full border-2 border-orange-500" />
        <div>
          <h2 className="text-gray-900 font-bold text-xl">{initialData.name}</h2>
          <p className="text-gray-500 text-sm">{initialData.email}</p>
        </div>
      </div>

      <form action={action} className="space-y-4">
        {state?.message && (
          <div className={`p-4 rounded-xl text-sm ${state.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {state.message}
          </div>
        )}

        {/* Editable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <label className="text-xs font-bold text-orange-600 uppercase tracking-wider">Full Name</label>
            <input name="name" defaultValue={initialData.name} className="w-full bg-transparent text-gray-900 mt-1 outline-none font-medium" />
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <label className="text-xs font-bold text-orange-600 uppercase tracking-wider">Profile Image URL</label>
            <input name="image" defaultValue={initialData.image} className="w-full bg-transparent text-gray-900 mt-1 outline-none font-medium" />
          </div>
        </div>

        {/* Read-Only Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200">
            <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
            <p className="text-gray-600 mt-1">{initialData.email}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200">
            <label className="text-xs font-bold text-gray-400 uppercase">Account Created</label>
            <p className="text-gray-600 mt-1">{new Date(initialData.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all active:scale-95 disabled:bg-gray-400"
        >
          {isPending ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </motion.div>
  );
}