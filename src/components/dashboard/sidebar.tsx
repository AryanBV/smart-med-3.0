'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/family-tree', label: 'Family Tree', icon: Users },
    { href: '/dashboard/documents', label: 'Documents', icon: FileText },
  ];
  
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Link href="/dashboard">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-[#24E5C6]">SMART_MED</h1>
          </div>
        </Link>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium">David</h2>
          <p className="text-gray-500 text-sm">Welcome back!</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    isActive 
                      ? "bg-[#24E5C6] text-white font-medium" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto border-t border-gray-200">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-red-500 hover:bg-red-50 w-full text-left"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
