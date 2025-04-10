import { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';

export default function useGetUserInfo(
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (setIsLoading) {
        // setIsLoading is expected to be true before
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setUser, setIsLoading]);
}