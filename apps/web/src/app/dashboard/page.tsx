"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@repo/ui/button';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.email}</p>}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
