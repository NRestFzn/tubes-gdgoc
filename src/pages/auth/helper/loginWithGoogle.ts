import {auth, googleProvider} from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { NavigateFunction } from 'react-router';

import { AuthErrorType } from '../SignIn';

export const loginWithGoogle = async (
  e: React.FormEvent,
  navigate: NavigateFunction,
  setErrorType: React.Dispatch<React.SetStateAction<AuthErrorType | null>>,
  errorAction: () => void
): Promise<void> => {
  e.preventDefault();

  try {
    await signInWithPopup(auth, googleProvider);

    setErrorType(null);
    navigate('/admin/destination');
  } catch {
    setErrorType('generic');
    errorAction();
  }
};