'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { name: 'Overview', path: '/dashboard' },
    { name: 'Profile', path: '/dashboard/profile' },
    { name: 'My Orders', path: '/dashboard/orders' },
  ];

  return (
    <nav className="p-4 space-y-2">
      {links.map((l) => (
        <Link key={l.path} href={l.path} className={`block p-3 rounded-xl ${pathname === l.path ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-50'}`}>
          {l.name}
        </Link>
      ))}
    </nav>
  );
}