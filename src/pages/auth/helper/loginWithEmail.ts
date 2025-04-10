import {FirebaseError} from 'firebase/app';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '@/firebase';
import { NavigateFunction } from 'react-router';
import { AuthErrorType } from '../SignIn';

export const loginWithEmail = async (
  e: React.FormEvent,
  navigate: NavigateFunction,
  setErrorType: React.Dispatch<React.SetStateAction<AuthErrorType | null>>,
  errorAction: () => void,
  email: string,
  password: string
): Promise<void> => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorType(null); // Clear errors on success
      navigate('/admin/destination'); // Redirect on success
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          setErrorType('invalid-credentials');
          errorAction();
        } else {
          setErrorType('generic');
          errorAction();
        }
      } else {
        setErrorType('generic');
        errorAction();
      }
    }
  };