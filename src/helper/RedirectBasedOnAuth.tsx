import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';

import useGetUserInfo from '@/hooks/useGetUserInfo';
import PublicLayout from '@/layouts/PublicLayout';
import HomePage from '@/pages/home';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function RedirectBasedOnAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useGetUserInfo(setUser, setLoading)

  if (loading) return <LoadingSpinner/>;

  return user ? (
    <Navigate to="/admin/destination" replace />
  ) : (
    <PublicLayout>
      <HomePage/>
    </PublicLayout>
  );
}