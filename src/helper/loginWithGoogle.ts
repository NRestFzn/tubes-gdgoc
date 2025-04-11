import { auth, googleProvider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';
import { NavigateFunction } from 'react-router';


import { AuthErrorType } from '../pages/auth/SignIn';


export const loginWithGoogle = async (
  e: React.FormEvent,
  navigate: NavigateFunction,
  setErrorType: React.Dispatch<React.SetStateAction<AuthErrorType | null>>,
  errorAction: () => void
): Promise<void> => {
  e.preventDefault();

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log("User info after login:", {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
    });

    if (!user.email) {
      throw new Error("Email not available from Google account.");
    }

    setErrorType(null);
    navigate('/admin/destination');
  } catch (error) {
    console.error("Login error:", error);
    setErrorType('generic');
    errorAction();
  }
};
