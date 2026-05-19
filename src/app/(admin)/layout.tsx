"use client"

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.replace('/login?redirect=/admin');
        return;
      }

      const userEmail = session.user.email?.toLowerCase() || '';
      if (!ADMIN_EMAILS.includes(userEmail)) {
        await supabase.auth.signOut();
        router.replace('/login?redirect=/admin');
        return;
      }

      setIsLoading(false);
    }
    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-black min-h-screen">
        <div className="w-6 h-6 border border-gold-800 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    <>{children}</>
  );
}
