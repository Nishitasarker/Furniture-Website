'use client';
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ডেস্কটপ সাইডবার */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 font-bold text-orange-600 text-2xl">FURNS</div>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        {/* মোবাইল হেডার - এক লাইনে থাকবে */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="font-bold text-orange-600 text-xl">FURNS</div>
          <Sidebar /> {/* এখানেই মেনু বাটনটি আসবে */}
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}