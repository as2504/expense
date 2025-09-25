"use client";

import React, { useEffect } from 'react';
import { useAuth } from './auth-provider';
import { useRouter } from 'next/navigation';
import { TabNavigation } from './tab-navigation';
import { AppHeader } from './app-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // AuthProvider already shows a skeleton loader
    return null;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
        {/* Desktop Header */}
        <div className="hidden md:block">
            <AppHeader />
        </div>
      
        {/* Desktop Nav */}
        <div className="container hidden md:block pt-4">
            <TabNavigation />
        </div>

        <main className="flex-1 container px-4 pb-20 md:pb-4">{children}</main>

        {/* Mobile Nav */}
        <div className="md:hidden">
            <TabNavigation />
        </div>
    </div>
  );
}
