'use client';
import Sidebar from "@/components/dashboard/Sidebar";
import { Sofa }  from "lucide-react"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        {/* Added items-center here to align vertically */}
        <div className="p-6 flex items-center gap-2">
          <Sofa size={32} className="text-orange-600" />
          <span className="text-3xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Rajdhani, sans-serif' }}>FURNS</span>
        </div>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          {/* Added items-center here */}
          <div className="flex items-center gap-1.5 text-orange-600">
            <Sofa size={24} className="text-orange-600" />
            <span className="text-xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Rajdhani, sans-serif' }}>FURNS</span>
          </div>
          <Sidebar />
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}