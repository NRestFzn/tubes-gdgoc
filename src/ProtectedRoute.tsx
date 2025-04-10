import { useState } from 'react';
import { User } from 'firebase/auth';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import NotFound from './pages/NotFound';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useGetUserInfo(setUser, setIsLoading);

  if (isLoading) {
    return null; // or a fancy spinner
  }

  return user ? <>{children}</> : <NotFound />;
}
