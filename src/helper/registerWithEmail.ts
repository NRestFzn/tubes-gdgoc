import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';
import { NavigateFunction } from 'react-router';
import { AuthErrorType } from '@/pages/auth/SignUp';

export const registerWithEmail = async (
  e: React.FormEvent,
  navigate: NavigateFunction,
  setErrorType: React.Dispatch<React.SetStateAction<AuthErrorType | null>>,
  errorAction: () => void,
  name: string,
  email: string,
  password: string
): Promise<void> => {
  e.preventDefault();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Set display name after account creation
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }

    setErrorType(null); // clear error state
    navigate('/sign-in'); // redirect to sign-in page
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error('Firebase error:', error.code, error.message);
    } else {
      console.error('Unexpected error:', error);
    }

    setErrorType('generic');
    errorAction(); // show error popup
  }
};
