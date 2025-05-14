'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/profile', label: 'Profile' },
  { href: '/dashboard/documents', label: 'Documents' },
  { href: '/dashboard/health-metrics', label: 'Health Metrics' },
];

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-64 h-screen bg-slate-100 dark:bg-slate-900 p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold">SMART_MED_3.0</h2>
      </div>
      
      <nav className="space-y-1 flex-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={lock px-4 py-2 rounded-md }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
