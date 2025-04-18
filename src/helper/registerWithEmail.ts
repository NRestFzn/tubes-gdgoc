import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { NavigateFunction } from 'react-router';
import { AuthErrorType } from '@/pages/auth/SignUp';

export const registerWithEmail = async (
  e: React.FormEvent,
  navigate: NavigateFunction,
  setErrorType: React.Dispatch<React.SetStateAction<AuthErrorType | null>>,
  errorAction: () => void,
  email: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  e.preventDefault();
  setIsLoading(true); // Start loading

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    setErrorType(null);
    navigate('/sign-in'); // Redirect after success
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error('Firebase error:', error.code, error.message);
    } else {
      console.error('Unexpected error:', error);
    }

    setErrorType('generic');
    errorAction();
  } finally {
    setIsLoading(false); // Stop loading
  }
};

