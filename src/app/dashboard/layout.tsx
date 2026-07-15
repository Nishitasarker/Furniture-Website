import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - সবসময় থাকবে */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 font-bold text-orange-600 text-2xl">FURNS</div>
        <DashboardSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
}