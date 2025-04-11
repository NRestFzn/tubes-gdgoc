import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import useGetUserInfo from '@/hooks/useGetUserInfo';

export default function RedirectBasedOnAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useGetUserInfo(setUser, setLoading)

  if (loading) return <div>Loading...</div>; // or spinner

  return user ? (
    <Navigate to="/admin/destination" replace />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}