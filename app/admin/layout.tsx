'use client';

import React from 'react';
import './admin.css';
import { AuthProvider } from '@/lib/AuthContext';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AuthProvider>
      <div className="admin-body">
        {isLoginPage ? (
          <main className="min-h-screen flex items-center justify-center">
            {children}
          </main>
        ) : (
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <AdminHeader />
              <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}
